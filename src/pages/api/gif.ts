import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  hello: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  /*
   *
   * Your server side GIF maker implementation should start here
   *
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
