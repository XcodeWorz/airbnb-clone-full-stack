import * as React from "react";
import { Form, Input } from "antd";
const { TextArea } = Input;
const FormItem = Form.Item;

export const TextAreaField = ({
  field: { onChange, ...field },
  form: { touched, errors },
  label,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <FormItem
      label={label}
      help={errorMsg}
      hasFeedback={!!errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
    >
      <TextArea
        {...field}
        {...props}
        autosize={{ minRows: 2, maxRows: 6 }}
        onChange={onChange}
      />
    </FormItem>
  );
};
