import type { NextApiRequest, NextApiResponse } from "next";
import { downloadFileFromUrl, makeTempFilePathFromUrl } from "@/helpers/files";
const sharp = require("sharp");

type ResponseData = {
  grayscaledUrl: string;
  localInputUrl?: string;
  localOutputUrl: string;
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
  sharp(localInputUrl).grayscale().toFile(localOutputUrl);

  //   const imageResponse = await axios({url: url, responseType: 'arraybuffer'});
  // const buffer = Buffer.from(imageResponse.data, 'binary');
  // let src = new Sharp(buffer);
  // try {
  //     await src.jpeg();
  //     await src.resize(null, 1920);
  //     await src.resize(1080, null);
  //     const metadata = await src.metadata();//this was where it failed, but now it prints an object of metadata
  //     console.log(metadata);
  // } catch(e) {
  //     console.log(e);//Doesn't catch anything any more!
  // }

  res.status(200).json({ grayscaledUrl: url, localInputUrl, localOutputUrl });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
