import React from "react";
import { render, fireEvent, getAllByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Popup from "./popup";
import * as popupUtils from "./popup-utils";

describe("Popup", () => {
  describe("with empty environments ", () => {
    it("should show no environments message", () => {
      const { getByText, getByTestId } = render(<Popup />);
      expect(
        getByText("There are no saved environments.")
      ).toBeInTheDocument();
      const environmentForm = getByTestId("environment-form");
      expect(environmentForm).toHaveProperty("open", true);
    });
  });
  describe("with environments ", () => {
    let environment: popupUtils.IEnvironment;
    beforeAll(() => {
      environment = { name: "Berlin", url: "https://www.berlin.de/" };
      jest
        .spyOn(popupUtils, "useActionHandlers")
        .mockImplementation(result => ({
          environments: [environment],
          commitEnvironments: jest.fn(),
          deleteEnvironment: jest.fn(),
          onSubmit: jest.fn(),
          saveLocalEnvironments: jest.fn()
        }));
      jest.spyOn(popupUtils, "useActiveTab").mockImplementation(() => ({
        id: 1,
        url: "http://localhost:3001/"
      }));
    });
    it("should show the environments message", () => {
      const { getByText, queryAllByText, getByTestId } = render(<Popup />);
      expect(queryAllByText("There are no saved environments.")).toEqual([]);
      const environmentForm = getByTestId("environment-form");
      expect(environmentForm).toHaveProperty("open", false);
      expect(getByText(environment.name)).toBeInTheDocument();
    });
  });
});
