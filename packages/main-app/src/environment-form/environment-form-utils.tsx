export interface IEnvironment {
  name: string;
  url: string;
}

export const isNameDuplicate = (
  environments: IEnvironment[],
  environmentName: string
) => environments.some(({ name }) => name === environmentName);

export const hasValue = (value: string) => Boolean(value);

export const isValidateURL = (url: string) => {
  let isValid = true;
  try {
    // tslint:disable-next-line: no-unused-expression
    new URL(url);
  } catch {
    isValid = false;
  }
  return isValid;
};

export const errorMessages = {
  noValueError: "Please provide some value for this field.",
  duplicateNameError: "There is already an environment with this name.",
  invalidUrlError: "Please valid URL e.g https://example.com"
};
export const createValidator = (environments: IEnvironment[]) => (
  environment: IEnvironment
) => {
  const errors: { name?: string; url?: string } = {};
  // name validations
  if (!hasValue(environment.name)) {
    errors.name = errorMessages.noValueError;
  }
  if (isNameDuplicate(environments, environment.name)) {
    errors.name = errorMessages.duplicateNameError;
  }
  // url validations
  if (!isValidateURL(environment.url)) {
    errors.url = errorMessages.invalidUrlError;
  }
  if (!hasValue(environment.url)) {
    errors.url = errorMessages.noValueError;
  }

  return errors;
};
