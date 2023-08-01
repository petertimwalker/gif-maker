import { APIRoute, sanitizeKey } from "next-s3-upload";
import { nanoid } from "nanoid";

/*
 * The upload logic in this repo is handled by the next-s3-upload package
 * More information can be found here: https://next-s3-upload.codingvalue.com/
 * You likely don't need to modify this.
 *
 */

export default APIRoute.configure({
  /*
   * we are leaving these credentials in the repo so that candidates can
   * set up the project more easily, without having to create an .env file
   *
   * this really shouldn't be commited to source control,
   * but hopefully you won't abuse this!
   *
   * these credentials give read/write access to the kapwing-uploads bucket on s3
   *
   */
  accessKeyId: "AKIA2YJ3H2ADP6PAY2PF",
  secretAccessKey: "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",
  bucket: "kapwing-uploads",
  region: "us-west-2",
  key(req, filename) {
    return `${nanoid(8)}-${sanitizeKey(filename)}`;
  },
});
