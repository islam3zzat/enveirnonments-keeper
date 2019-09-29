import React from "react";
import styles from "./popup.css";
import EnveironmentForm from "../enveironment-form";
import EnveironmentsList from "../enveironments-list";
import { useActionHandlers, useActiveTab, IEnvironment } from "./popup-utils";

const Popup = () => {
  const detailsRef = React.useRef() as React.RefObject<HTMLDetailsElement>;
  const updateEnveironmentsCallback = (nextEnveironments: IEnvironment[]) => {
    if (detailsRef.current && nextEnveironments.length === 0) {
      detailsRef.current.open = true;
    }
  };
  const {
    onSubmit,
    deleteEnveironment,
    enveironments,
    saveLocalEnveironments
  } = useActionHandlers(updateEnveironmentsCallback);
  const activeTab = useActiveTab();

  React.useEffect(() => {
    chrome.storage.sync.get("enveironments", response => {
      saveLocalEnveironments(response.enveironments);
    });
  }, []);

  return (
    <div className={styles["popup-container"]}>
      <details ref={detailsRef} data-testid="enveironment-form">
        <summary>Add Enveironment</summary>
        <EnveironmentForm enveironments={enveironments} onSubmit={onSubmit} />
      </details>

      {activeTab && (
        <EnveironmentsList
          activeTabUrl={activeTab.url}
          enveironments={enveironments}
          deleteEnveironment={deleteEnveironment}
        />
      )}
    </div>
  );
};

export default Popup;
