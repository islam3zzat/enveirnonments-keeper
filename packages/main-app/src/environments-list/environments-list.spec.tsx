import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EnvironmentsList from "./environments-list";

describe("EnvironmentsList", () => {
  describe("with empty environments list", () => {
    it("should show the no-enveronments message", () => {
      const deleteEnvironment = jest.fn();
      const { getByText } = render(
        <EnvironmentsList
          deleteEnvironment={deleteEnvironment}
          environments={[]}
          activeTabUrl="https://production.mycompany.de/path/to/resource"
        />
      );
      expect(
        getByText("There are no saved environments.")
      ).toBeInTheDocument();
    });
  });
  describe("with non-empty environments list", () => {
    it("should show the provided enveronments", () => {
      const deleteEnvironment = jest.fn();
      const environment = {
        name: "test environment name",
        url: "https://staging.mycompany.de"
      };
      const { getByText, queryAllByText } = render(
        <EnvironmentsList
          deleteEnvironment={deleteEnvironment}
          environments={[environment]}
          activeTabUrl="https://production.mycompany.de/path/to/resource/12121229983"
        />
      );
      expect(queryAllByText("There are no saved environments.")).toEqual([]);
      const linkToSavedEnvironment = getByText("test environment name");
      expect(linkToSavedEnvironment).toBeInTheDocument();
      expect(linkToSavedEnvironment).toHaveAttribute(
        "href",
        "https://staging.mycompany.de/path/to/resource/12121229983"
      );
      const deleteButton = getByText("🗑");
      fireEvent.click(deleteButton);
      expect(deleteEnvironment).toHaveBeenCalledWith(environment.name);
    });
  });
});
