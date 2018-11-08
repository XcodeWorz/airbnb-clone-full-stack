import * as React from "react";
import { Form, Input, InputNumber } from "antd";

const FormItem = Form.Item;

export const InputField = ({
  field: { onChange, ...field },
  form: { touched, errors, setFieldValue },
  label,
  useNumberComponent = false,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  const Comp = useNumberComponent ? InputNumber : Input;

  return (
    <FormItem
      label={label}
      help={errorMsg}
      hasFeedback={!!errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
    >
      <Comp
        {...field}
        {...props}
        onChange={
          useNumberComponent
            ? newValue => setFieldValue(field.name, newValue)
            : onChange
        }
      />
    </FormItem>
  );
};
