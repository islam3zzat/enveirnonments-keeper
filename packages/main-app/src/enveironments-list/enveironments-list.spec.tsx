import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EnveironmentsList from "./enveironments-list";

describe("EnveironmentsList", () => {
  describe("with empty enveironments list", () => {
    it("should show the no-enveronments message", () => {
      const deleteEnveironment = jest.fn();
      const { getByText } = render(
        <EnveironmentsList
          deleteEnveironment={deleteEnveironment}
          enveironments={[]}
          activeTabUrl="https://production.mycompany.de/path/to/resource"
        />
      );
      expect(
        getByText("There are no saved enveironments.")
      ).toBeInTheDocument();
    });
  });
  describe("with non-empty enveironments list", () => {
    it("should show the provided enveronments", () => {
      const deleteEnveironment = jest.fn();
      const enveironment = {
        name: "test enveironment name",
        url: "https://staging.mycompany.de"
      };
      const { getByText, queryAllByText } = render(
        <EnveironmentsList
          deleteEnveironment={deleteEnveironment}
          enveironments={[enveironment]}
          activeTabUrl="https://production.mycompany.de/path/to/resource/12121229983"
        />
      );
      expect(queryAllByText("There are no saved enveironments.")).toEqual([]);
      const linkToSavedEnveironment = getByText("test enveironment name");
      expect(linkToSavedEnveironment).toBeInTheDocument();
      expect(linkToSavedEnveironment).toHaveAttribute(
        "href",
        "https://staging.mycompany.de/path/to/resource/12121229983"
      );
      const deleteButton = getByText("🗑");
      fireEvent.click(deleteButton);
      expect(deleteEnveironment).toHaveBeenCalledWith(enveironment.name);
    });
  });
});
