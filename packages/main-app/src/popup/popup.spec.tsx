import React from "react";
import { render, fireEvent, getAllByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Popup from "./popup";
import * as popupUtils from "./popup-utils";

describe("Popup", () => {
  describe("with empty enveironments ", () => {
    it("should show no enveironments message", () => {
      const { getByText, getByTestId } = render(<Popup />);
      expect(
        getByText("There are no saved enveironments.")
      ).toBeInTheDocument();
      const enveironmentForm = getByTestId("enveironment-form");
      expect(enveironmentForm).toHaveProperty("open", true);
    });
  });
  describe("with enveironments ", () => {
    let enveironment: popupUtils.IEnvironment;
    beforeAll(() => {
      enveironment = { name: "Berlin", url: "https://www.berlin.de/" };
      jest
        .spyOn(popupUtils, "useActionHandlers")
        .mockImplementation(result => ({
          enveironments: [enveironment],
          commitEnveironments: jest.fn(),
          deleteEnveironment: jest.fn(),
          onSubmit: jest.fn(),
          saveLocalEnveironments: jest.fn()
        }));
      jest.spyOn(popupUtils, "useActiveTab").mockImplementation(() => ({
        id: 1,
        url: "http://localhost:3001/"
      }));
    });
    it("should show the enveironments message", () => {
      const { getByText, queryAllByText, getByTestId } = render(<Popup />);
      expect(queryAllByText("There are no saved enveironments.")).toEqual([]);
      const enveironmentForm = getByTestId("enveironment-form");
      expect(enveironmentForm).toHaveProperty("open", false);
      expect(getByText(enveironment.name)).toBeInTheDocument();
    });
  });
});
