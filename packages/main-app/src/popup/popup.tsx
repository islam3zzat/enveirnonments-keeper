import React from "react";
import "normalize.css";
import styles from "./popup.css";
import browser from "../utils";
import EnvironmentForm from "../environment-form";
import EnvironmentsList from "../environments-list";
import { useActionHandlers, useActiveTab, IEnvironment } from "./popup-utils";

const Popup = () => {
  const detailsRef = React.useRef() as React.RefObject<HTMLDetailsElement>;
  const updateEnvironmentsCallback = (nextEnvironments: IEnvironment[]) => {
    if (detailsRef.current && nextEnvironments.length === 0) {
      detailsRef.current.open = true;
    }
  };
  const {
    onSubmit,
    deleteEnvironment,
    environments,
    saveLocalEnvironments
  } = useActionHandlers(updateEnvironmentsCallback);
  const activeTab = useActiveTab();

  React.useEffect(() => {
    browser.storage.sync.get("environments", response => {
      saveLocalEnvironments(response.environments);
    });
  }, []);

  return (
    <div className={styles["popup-container"]}>
      <details ref={detailsRef} data-testid="environment-form">
        <summary>Add Environment</summary>
        <EnvironmentForm environments={environments} onSubmit={onSubmit} />
      </details>

      {activeTab && (
        <EnvironmentsList
          activeTabUrl={activeTab.url}
          environments={environments}
          deleteEnvironment={deleteEnvironment}
        />
      )}
    </div>
  );
};

export default Popup;
