import type { NextApiRequest, NextApiResponse } from "next";
import {
  downloadFileFromUrl,
  getNameAndExtensionFromUrl,
  makeTempFilePathFromUrl,
  uploadFileFromLocalPath,
} from "@/helpers/files";
import { unlink } from "fs/promises";
const GIFEncoder = require("gif-encoder-2");
const { createCanvas, Image } = require("canvas");
const { createWriteStream } = require("fs");
import sharp from "sharp";

type ResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { body } = req;
  const { urls, intervalDuration } = body;

  const files: string[] = await downloadFilesLocally();

  // get the name of the first file to use as the name of the GIF
  const { basename } = getNameAndExtensionFromUrl(urls[0]);
  const gifFileName = `${basename}.gif`;
  const localOutputPath = makeTempFilePathFromUrl(gifFileName);

  // create GIF
  try {
    await createGif("neuquant", localOutputPath, files, intervalDuration);
  } catch (error: any) {
    await cleanupLocalFiles([...files, localOutputPath]);
    return res.status(error.code).json({ error: error.message });
  }

  // upload the GIF to S3
  const uploadedUrl = await uploadFileFromLocalPath(
    localOutputPath,
    gifFileName
  );

  // handle happy path
  if (uploadedUrl) {
    await cleanupLocalFiles([...files, localOutputPath]);
    return res.status(200).json({ gifUrl: uploadedUrl });
  }

  // handle upload failure
  return res.status(500).json({ error: "GIF failed to upload" });

  // helper functions

  async function cleanupLocalFiles(filePaths: string[]) {
    const unlinkPromises = filePaths.map((filePath) => deleteFile(filePath));
    await Promise.allSettled(unlinkPromises);
  }

  async function deleteFile(filePath: string) {
    unlink(filePath).then(
      () => console.info(`File deleted: ${filePath}`),
      (error) =>
        console.error(
          `Failed to delete file: ${filePath}, error: ${error.message}`
        )
    );
  }

  // download all files locally and resize them
  async function downloadFilesLocally() {
    const files: string[] = [];
    for (const url of urls) {
      const localInputUrl = await downloadFileFromUrl(url);

      // if the file was downloaded successfully, resize it accordingly
      if (localInputUrl) {
        const resizedImage = await resizeImage(localInputUrl, 100, 100);
        if (resizedImage) {
          files.push(resizedImage);
        }
        // delete the original file
        await deleteFile(localInputUrl);
      }
    }
    return files;
  }

  async function resizeImage(
    inputPath: string,
    width: number,
    height: number
  ): Promise<string> {
    const outputPath = inputPath.replace(/(\.\w+)$/, "_resized$1");
    await sharp(inputPath).resize(width, height).toFile(outputPath);
    return outputPath;
  }

  // createGIF assumes that all files are of the same dimensions
  // which is handled in downloadFilesLocally
  async function createGif(
    algorithm: string,
    localOutputPath: string,
    files: string[],
    intervalDuration: number
  ) {
    return new Promise<void>(async (resolve1, reject1) => {
      try {
        // get the width and height of the first image
        const [width, height] = await new Promise<[number, number]>(
          (resolve2, reject2) => {
            const image = new Image();
            image.onload = () => resolve2([image.width, image.height]);
            image.onerror = (error: any) => {
              // on error reject promise with error and file name
              const { basename, extension } = getNameAndExtensionFromUrl(
                files[0]
              );
              reject2({
                code: 400,
                message: `Failed to load image ${basename + extension}`,
                error,
              });
            };
            // attempt to load image
            image.src = files[0];
          }
        );

        const writeStream = createWriteStream(localOutputPath);

        // when stream closes GIF is created so resolve promise
        writeStream.on("close", () => {
          resolve1();
        });

        writeStream.on("error", (error: any) => {
          reject1({ code: 500, message: "Failed to write GIF file", error });
        });

        const encoder = new GIFEncoder(width, height, algorithm);
        // pipe encoder's read stream to our write stream
        encoder.createReadStream().pipe(writeStream);
        encoder.start();
        encoder.setDelay(intervalDuration);

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // draw an image for each file and add frame to encoder
        for (const file of files) {
          await new Promise<void>((resolve3, reject3) => {
            const image = new Image();

            const { basename, extension } = getNameAndExtensionFromUrl(file);
            const timeout = setTimeout(() => {
              const error = new Error(
                `Image ${basename + extension} is taking too long to draw`
              );
              reject3(error);
            }, 5000); // 5 seconds timeout

            image.onload = () => {
              clearTimeout(timeout);
              ctx.drawImage(image, 0, 0);
              encoder.addFrame(ctx);
              resolve3();
            };
            image.onerror = (error: any) => {
              clearTimeout(timeout);
              reject3({
                code: 500,
                message: `Error occured while drawing ${basename + extension}`,
                error,
              });
            };
            image.src = file;
          });
        }
        encoder.finish();
      } catch (error) {
        reject1({ code: 500, message: "Failed to write GIF file", error });
      }
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
