import { APIRoute, sanitizeKey } from "next-s3-upload";
import { nanoid } from "nanoid";

/*
 * The upload logic in this repo is handled by the next-s3-upload package
 * More information can be found here: https://next-s3-upload.codingvalue.com/
 * You likely don't need to modify this file.
 *
 */
export default APIRoute.configure({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_BUCKET,
  region: process.env.AWS_REGION,
  key(req, filename) {
    return `${nanoid(8)}-${sanitizeKey(filename)}`;
  },
});
