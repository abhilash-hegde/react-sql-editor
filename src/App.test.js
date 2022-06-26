import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  it("renders app", async () => {
    render(<App />);
    const heading = await screen.findByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("SQL Editor");
  });
});
