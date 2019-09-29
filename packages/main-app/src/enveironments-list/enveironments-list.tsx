import React from "react";
import styles from "./enveironments-list.css";

interface IEnvironment {
  name: string;
  url: string;
}

interface IEnveironmentsList {
  enveironments: IEnvironment[];
  activeTabUrl: string;
  deleteEnveironment: (name: string) => void;
}
const EnveironmentsList: React.FunctionComponent<
  IEnveironmentsList
> = props => {
  return (
    <>
      {!props.enveironments.length ? (
        <h3>There are no saved enveironments.</h3>
      ) : (
        <div className={styles["enveironments-container"]}>
          {props.enveironments.map((enveironment: IEnvironment) => {
            return (
              <div key={enveironment.name}>
                <a
                  className={styles["enveironment-link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={props.activeTabUrl.replace(
                    new URL(props.activeTabUrl).origin,
                    new URL(enveironment.url).origin
                  )}
                >
                  {enveironment.name}
                </a>
                <button
                  onClick={() => {
                    props.deleteEnveironment(enveironment.name);
                  }}
                  className={styles["delete-enveironment"]}
                >
                  🗑
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default EnveironmentsList;
