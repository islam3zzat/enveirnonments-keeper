import React from "react";
import styles from "./environments-list.css";

interface IEnvironment {
  name: string;
  url: string;
}

interface IEnvironmentsList {
  environments: IEnvironment[];
  activeTabUrl: string;
  deleteEnvironment: (name: string) => void;
}
const EnvironmentsList: React.FunctionComponent<
  IEnvironmentsList
> = props => {
  return (
    <>
      {!props.environments.length ? (
        <h3>There are no saved environments.</h3>
      ) : (
        <div className={styles["environments-container"]}>
          {props.environments.map((environment: IEnvironment) => {
            return (
              <div key={environment.name}>
                <a
                  className={styles["environment-link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={props.activeTabUrl.replace(
                    new URL(props.activeTabUrl).origin,
                    new URL(environment.url).origin
                  )}
                >
                  {environment.name}
                </a>
                <button
                  onClick={() => {
                    props.deleteEnvironment(environment.name);
                  }}
                  className={styles["delete-environment"]}
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

export default EnvironmentsList;
