import React from "react";
import { Alert } from "antd";

export const ErrorMessage = ({ errors }) => {
  return errors && errors.length ? (
    <Alert
      style={{ marginBottom: 24 }}
      message={errors[0].message}
      type="error"
      showIcon
    />
  ) : null;
};
