import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  grayscaledUrl: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { body } = req;
  const { url } = body;
  res.status(200).json({ grayscaledUrl: url });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
