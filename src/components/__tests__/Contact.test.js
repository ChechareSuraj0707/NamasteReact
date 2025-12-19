import { render, screen } from "@testing-library/react";
import ContactUs from "../Contact";
import "@testing-library/jest-dom";

test("Should load contact us component", () => {
  render(<ContactUs />);
  const heading = screen.getByRole("heading");
  //   const button = screen.getByRole("button");
  const button = screen.getByText("Submit");
  expect(heading).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
