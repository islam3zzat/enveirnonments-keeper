import React from "react";
import { Formik, FormikActions } from "formik";
import styles from "./environment-form.css";
import { IEnvironment, createValidator } from "./environment-form-utils";

interface IEnvironmentForm {
  environments: IEnvironment[];
  onSubmit: (environment: { name: string; url: string }) => void;
}
const EnvironmentForm: React.FunctionComponent<IEnvironmentForm> = props => {
  const onSubmit = (
    environment: IEnvironment,
    formik: FormikActions<IEnvironment>
  ) => {
    props.onSubmit(environment);
    formik.resetForm();
  };

  return (
    <Formik
      validate={createValidator(props.environments)}
      validateOnChange={true}
      initialValues={{ name: "", url: "" }}
      onSubmit={onSubmit}
      render={({
        values,
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        isValid,
        touched
      }) => (
        <form className={styles["inputs-container"]} onSubmit={handleSubmit}>
          <div>
            <input
              className={[
                styles["form-input"],
                touched.name && errors.name && styles["form-input-error"]
              ].join(" ")}
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Environment name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && (
              <div className={styles["inputs-error"]}>{errors.name}</div>
            )}
          </div>
          <div>
            <input
              className={styles["form-input"]}
              type="url"
              autoComplete="off"
              value={values.url}
              name="url"
              placeholder="Enter URL: e.g https://example.com"
              pattern="https?://.*"
              size={30}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.url && (
              <div className={styles["inputs-error"]}>{errors.url}</div>
            )}
          </div>
          <button
            className={styles["submit-button"]}
            type="submit"
            disabled={!isValid}
          >
            Save environment
          </button>
        </form>
      )}
    />
  );
};

export default EnvironmentForm;
