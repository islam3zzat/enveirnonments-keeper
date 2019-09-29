import React from "react";
import { Formik, FormikActions } from "formik";
import styles from "./enveironment-form.css";
import { IEnvironment, createValidator } from "./enveironment-form-utils";

interface IEnveironmentForm {
  enveironments: IEnvironment[];
  onSubmit: (enveironment: { name: string; url: string }) => void;
}
const EnveironmentForm: React.FunctionComponent<IEnveironmentForm> = props => {
  const onSubmit = (
    enveironment: IEnvironment,
    formik: FormikActions<IEnvironment>
  ) => {
    props.onSubmit(enveironment);
    formik.resetForm();
  };

  return (
    <Formik
      validate={createValidator(props.enveironments)}
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
              placeholder="Enveironment name"
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
            Save enveironment
          </button>
        </form>
      )}
    />
  );
};

export default EnveironmentForm;
