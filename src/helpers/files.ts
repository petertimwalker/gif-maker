import fetch from "node-fetch";
import { nanoid } from "nanoid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {
  accessKeyId,
  secretAccessKey,
  bucket,
  region,
} from "@/helpers/credentials";
const tmp = require("tmp");
const fs = require("fs");

export const getFilenameFromUrl = (url: string): string => {
  if (!url) {
    throw new Error("No URL provided.");
  }

  const filename = url.split("/").pop();

  if (!filename) {
    throw new Error("No filename found for the provided URL.");
  }
  return filename;
};

export const makeTempFilePath = (filename: string): string => {
  const tmpobj = tmp.fileSync({
    name: `${nanoid(8)}-${filename}`,
  });
  return tmpobj.name;
};

export const makeTempFilePathFromUrl = (url: string): string => {
  const filename = getFilenameFromUrl(url);
  const localFileUrl = makeTempFilePath(filename);
  return localFileUrl;
};

// this function takes a url, downloads the file
// to a temporary local file, and returns the path
// to the downloaded file
export const downloadFileFromUrl = async (url: string) => {
  try {
    const filename = getFilenameFromUrl(url);
    const tempFilepath = makeTempFilePath(filename);
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(tempFilepath);
    await new Promise((resolve, reject) => {
      if (!res || !res.body) {
        throw new Error("No response found for the provided URL.");
      }
      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
    return tempFilepath;
  } catch (error) {
    console.error("An error occurred while downloading:", error);
  }
};

// this function takes a local file path,
// uploads that file to Amazon S3
// then returns the publicly accessible link
export const uploadFileFromLocalPath = async (localPath: string) => {
  try {
    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const filename = getFilenameFromUrl(localPath);
    const params = {
      Bucket: bucket,
      Key: filename,
      Body: fs.readFileSync(localPath),
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
    const s3Url = "https://kapwing-uploads.s3.amazonaws.com/" + filename;
    return s3Url;
  } catch (error) {
    console.error("An error occurred while uploading:", error);
  }
};
