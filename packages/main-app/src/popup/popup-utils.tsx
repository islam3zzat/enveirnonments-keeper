import React from "react";
import browser from "../utils";

export interface IEnvironment {
  name: string;
  url: string;
}

export const useActiveTab = () => {
  const [activeTab, setActiveTab] = React.useState();
  React.useEffect(() => {
    browser.tabs.query({ active: true, currentWindow: true }, tabs => {
      setActiveTab(tabs[0]);
    });
  }, []);
  return activeTab;
};

const useSendMessage = (activeTab?: { id: number }) => {
  if (!activeTab) {
    return () => {
      // noop
    };
  }
  return (message: any, callback?: (response: any) => void) =>
    browser.tabs.sendMessage(activeTab.id, message, callback);
};

export const useActionHandlers = (
  updateEnvironmentsCallback?: (environments: IEnvironment[]) => void
) => {
  const [environments, setEnvironments] = React.useState<IEnvironment[]>([]);
  const activeTab = useActiveTab();
  const sendMessage = useSendMessage(activeTab);

  const saveLocalEnvironments = (nextEnvironments: IEnvironment[] = []) => {
    setEnvironments(nextEnvironments);
    if (updateEnvironmentsCallback) {
      updateEnvironmentsCallback(nextEnvironments);
    }
  };

  const commitEnvironments = (nextEnvironments: IEnvironment[]) => {
    browser.storage.sync.set({ environments: nextEnvironments });
    saveLocalEnvironments(nextEnvironments);
  };

  const onSubmit = (nextEnvironment: { name: string; url: string }) => {
    commitEnvironments([...environments, nextEnvironment]);
  };
  const deleteEnvironment = (environmentName: string) => {
    commitEnvironments(
      environments.filter(({ name }) => environmentName !== name)
    );
  };
  return {
    onSubmit,
    deleteEnvironment,
    commitEnvironments,
    environments,
    saveLocalEnvironments
  };
};
