import Breadcrumb from "./Breadcrumb";
import { render, screen } from "@testing-library/react";
//import constants
import { BreadcrumbsConstant } from "../../constants/EmployeeTable";

describe("Breadcrumb Unit Tests", () => {
  it("Contains The Correct Breadcrumb", () => {
    const { container } = render(
      <Breadcrumb breadcrumdsArr={BreadcrumbsConstant} />
    );
    BreadcrumbsConstant.forEach((item) => screen.getByText(item));
    expect(
      container.querySelectorAll(".ant-breadcrumb-separator").length
    ).toEqual(3);
  });
});
