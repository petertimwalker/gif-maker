import type { NextApiRequest, NextApiResponse } from "next";
import {
  downloadFileFromUrl,
  makeTempFilePathFromUrl,
  uploadFileFromLocalPath,
} from "@/helpers/files";
const sharp = require("sharp");

type ResponseData = {
  grayscaledUrl: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { body } = req;
  const { url } = body;

  // download the image to our local filesystem
  const localInputUrl = await downloadFileFromUrl(url);

  // create a temp path for the output file
  const localOutputUrl = makeTempFilePathFromUrl(url);

  // use sharp to grayscale the image
  await sharp(localInputUrl).grayscale().toFile(localOutputUrl);

  // upload the grayscaled image to AWS
  const uploadedUrl = await uploadFileFromLocalPath(localOutputUrl);

  // return the image back to the client
  if (uploadedUrl) {
    return res.status(200).json({ grayscaledUrl: uploadedUrl });
  }

  return res.status(500);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
