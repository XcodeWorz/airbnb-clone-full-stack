import React, { Component } from "react";
import { withFormik, Field } from "formik";
import { Form, Icon, Button } from "antd";

import { InputField } from "../../components/InputField";
import { ErrorMessage } from "./../../components/ErrorMessage";

import { emailSchema } from "@airbnb-clone/common";

import "./login.less";
const FormItem = Form.Item;

class ForgotPasswordView extends Component {
  showError = errors => {
    return <ErrorMessage errors={errors} />;
  };
  render() {
    const { handleSubmit, data } = this.props;

    return (
      <Form onSubmit={handleSubmit} className="login-form">
        {data && data.sendForgotPasswordEmail.errors
          ? this.showError(data.sendForgotPasswordEmail.errors)
          : null}

        <FormItem>
          <Field
            name="email"
            size="large"
            suffix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            component={InputField}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block size="large">
            Reset Password
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default withFormik({
  validationSchema: emailSchema,
  mapPropsToValues: () => ({
    email: ""
  }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.sendForgotPasswordEmail({ variables: values });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(ForgotPasswordView);
