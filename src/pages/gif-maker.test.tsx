import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GIFMaker from "./gif-maker";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

let mockUrls: string[] = [];

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("@/components/Upload", () => {
  return function MockUpload({
    handleFinish,
  }: {
    handleFinish: (urls: string[]) => void;
  }) {
    return (
      <div>
        Mock Upload Component
        <button onClick={() => handleFinish(mockUrls)}>Upload</button>
      </div>
    );
  };
});

describe("GIFMaker", () => {
  it("renders the title", () => {
    render(<GIFMaker />);
    expect(
      screen.getByRole("heading", { name: /GIF Maker/i })
    ).toBeInTheDocument();
  });

  it("renders each frame after upload", () => {
    mockUrls = ["url1.jpg", "url2.jpg"];
    render(<GIFMaker />);

    const uploadButton = screen.getByText("Upload");
    fireEvent.click(uploadButton);

    const imageElements = screen.getAllByRole("img");
    expect(imageElements[0]).toHaveAttribute("src", "url1.jpg");
    expect(imageElements[1]).toHaveAttribute("src", "url2.jpg");
  });

  it("renders preview after upload", () => {
    mockUrls = ["url1.jpg", "url2.jpg"];
    render(<GIFMaker />);

    const uploadButton = screen.getByText("Upload");
    fireEvent.click(uploadButton);

    expect(screen.getByText("Preview of GIF:")).toBeInTheDocument();
    expect(screen.getByText("Set Interval (ms):")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Stop" })).toBeInTheDocument();
  });

  it("renders Create component after upload", () => {
    mockUrls = ["url1.jpg", "url2.jpg"];
    render(<GIFMaker />);

    const uploadButton = screen.getByText("Upload");
    fireEvent.click(uploadButton);

    expect(screen.getByText("Create GIF")).toBeInTheDocument();
  });

  it("calls /api/gif endpoint and renders final GIF", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ gifUrl: "http://example.com/final_gif.gif" })
    );
    mockUrls = ["url1.jpg", "url2.jpg"];
    render(<GIFMaker />);

    const uploadButton = screen.getByText("Upload");
    fireEvent.click(uploadButton);

    const createButton = screen.getByText("Create GIF");
    fireEvent.click(createButton);

    await waitFor(() => {
      const finalGifElement = screen.getByAltText("Final GIF");
      expect(finalGifElement).toBeInTheDocument();
      expect(finalGifElement).toHaveAttribute(
        "src",
        "http://example.com/final_gif.gif"
      );
    });
  });
});
