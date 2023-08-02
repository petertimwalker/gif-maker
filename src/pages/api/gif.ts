import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import GifEncoder from "gif-encoder";

type ResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  /*
   *
   * Your server side GIF maker implementation should start here
   *
   * One way to do this is using sharp and GifEncoder
   *
   */
  res.status(200).json({ hello: "world!" });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
