/*
 * we are leaving these credentials in the repo so that candidates can
 * set up the project more easily, without having to create an .env file
 *
 * this really shouldn't be commited to source control,
 * but hopefully you won't abuse this!
 *
 * these credentials give read/write access to the kapwing-uploads bucket on s3
 *
 * Please make sure that you use a private github repo for your interview,]
 * so that these keys are not exposed to the internet.
 */

export const accessKeyId = "AKIA2YJ3H2ADP6PAY2PF";
export const secretAccessKey = "WFiryHz722g9n7YvnCcuf4nfRnM1qiOL2YlGU+q/";
export const bucket = "kapwing-uploads";
export const region = "us-west-2";
