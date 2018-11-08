import * as React from "react";
import { Form, Select } from "antd";
const Option = Select.Option;
const FormItem = Form.Item;

export const DropdownField = ({
  field: { onChange, onBlur: _, ...field },
  form: { touched, errors, setFieldValue },
  values = null,
  label,
  tagMode = false,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];
  const Selectmode = tagMode ? "tags" : "";
  const optionValues = values.map(value => (
    <Option key={value.id} value={value.id}>
      {value.text}
    </Option>
  ));

  return (
    <FormItem
      label={label}
      help={errorMsg}
      hasFeedback={!!errorMsg}
      validateStatus={errorMsg ? "error" : undefined}
    >
      <Select
        mode={Selectmode}
        showSearch
        {...field}
        {...props}
        style={{ width: "100%" }}
        onChange={newValue => setFieldValue(field.name, newValue)}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {optionValues}
      </Select>
    </FormItem>
  );
};
