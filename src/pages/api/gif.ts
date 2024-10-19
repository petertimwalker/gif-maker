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

type ResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { body } = req;
  const { urls } = body;

  const files: string[] = await downloadFilesLocally();

  // get the name of the first file to use as the name of the GIF
  const { basename } = getNameAndExtensionFromUrl(urls[0]);
  const gifFileName = `${basename}.gif`;
  const localOutputPath = makeTempFilePathFromUrl(gifFileName);

  await createGif("neuquant", localOutputPath, files);

  const uploadedUrl = await uploadFileFromLocalPath(
    localOutputPath,
    gifFileName
  );

  if (uploadedUrl) {
    await cleanupLocalFiles([...files, localOutputPath]);
    return res.status(200).json({ gifUrl: uploadedUrl });
  }

  return res.status(500);

  async function cleanupLocalFiles(filePaths: string[]) {
    const unlinkPromises = filePaths.map((filePath) =>
      unlink(filePath).then(
        () => console.info(`File deleted: ${filePath}`),
        (error) =>
          console.error(
            `Failed to delete file: ${filePath}, error: ${error.message}`
          )
      )
    );
    await Promise.allSettled(unlinkPromises);
  }

  async function downloadFilesLocally() {
    const files: string[] = [];
    for (const url of urls) {
      const localInputUrl = await downloadFileFromUrl(url);
      if (localInputUrl) {
        files.push(localInputUrl);
      }
    }
    return files;
  }

  async function createGif(
    algorithm: string,
    localOutputPath: string,
    files: string[]
  ) {
    return new Promise<void>(async (resolve1) => {
      // Create a new GIF file
      // find the width and height of the image
      const [width, height] = await new Promise<[number, number]>(
        (resolve2) => {
          const image = new Image();
          image.onload = () => resolve2([image.width, image.height]);
          image.src = files[0];
        }
      );

      const writeStream = createWriteStream(localOutputPath);

      // when stream closes GIF is created so resolve promise
      writeStream.on("close", () => {
        resolve1();
      });
      const encoder = new GIFEncoder(width, height, algorithm);
      // pipe encoder's read stream to our write stream
      encoder.createReadStream().pipe(writeStream);
      encoder.start();
      encoder.setDelay(200);

      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      // draw an image for each file and add frame to encoder
      for (const file of files) {
        await new Promise<void>((resolve3) => {
          const image = new Image();
          image.onload = () => {
            ctx.drawImage(image, 0, 0);
            encoder.addFrame(ctx);
            resolve3();
          };
          image.src = file;
        });
      }
      encoder.finish();
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
