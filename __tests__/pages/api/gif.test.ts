import { createMocks } from "node-mocks-http";
import handler from "../../../src/pages/api/gif";
import { NextApiRequest, NextApiResponse } from "next";

jest.mock("@/helpers/files", () => ({
  downloadFileFromUrl: jest.fn().mockResolvedValue("localPath1"),
  getNameAndExtensionFromUrl: jest
    .fn()
    .mockReturnValue({ basename: "test", extension: ".jpg" }),
  makeTempFilePathFromUrl: jest.fn().mockReturnValue("tempPath.gif"),
  uploadFileFromLocalPath: jest
    .fn()
    .mockResolvedValue("https://aws.s3.mock.gif"),
}));

jest.mock("canvas", () => ({
  createCanvas: jest.fn().mockReturnValue({
    getContext: jest.fn().mockReturnValue({
      drawImage: jest.fn(),
    }),
    toBuffer: jest.fn().mockReturnValue(Buffer.from("")),
  }),
  Image: class {
    width = 250;
    height = 250;
    onload: () => void = () => {};
    set src(_: string) {
      this.onload();
    }
  },
}));

jest.mock("fs/promises", () => ({
  unlink: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("gif-encoder-2", () => {
  return jest.fn().mockImplementation(() => ({
    createReadStream: jest.fn().mockReturnValue({
      pipe: jest.fn(),
    }),
    start: jest.fn(),
    setDelay: jest.fn(),
    addFrame: jest.fn(),
    finish: jest.fn(),
  }));
});

jest.mock("fs", () => ({
  createWriteStream: jest.fn().mockReturnValue({
    on: jest.fn((event, callback) => {
      if (event === "close") {
        callback();
      }
    }),
  }),
}));

describe("GIF Endpoint", () => {
  it("should call the endpoint and receive a response", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      url: "/api/gif",
      body: { urls: ["http://example.com/image.png"] },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      gifUrl: "https://aws.s3.mock.gif",
    });
  });

  it("should return a 500 status if the upload fails", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      url: "/api/gif",
      body: { urls: ["http://example.com/image.png"] },
    });

    jest
      .spyOn(require("@/helpers/files"), "uploadFileFromLocalPath")
      .mockResolvedValueOnce("");

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
  });
});
