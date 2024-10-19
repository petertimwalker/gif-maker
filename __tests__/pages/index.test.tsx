import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/index";

jest.mock("next/router", () => require("next-router-mock"));

describe("Home", () => {
  it("renders the title", () => {
    render(<Home />);
    expect(
      screen.getByText("Kapwing Interview Project by Peter Walker")
    ).toBeInTheDocument();
  });
});
