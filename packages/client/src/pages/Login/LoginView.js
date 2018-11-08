import React, { Component } from "react";
import { withFormik, Field } from "formik";
import { Form, Icon, Button, Divider } from "antd";

import { InputField } from "../../components/Fields/InputField";
import { ErrorMessage } from "./../../components/ErrorMessage";

import { loginSchema } from "@airbnb-clone/common";

import "./login.less";
const FormItem = Form.Item;

class LoginView extends Component {
  showError = errors => {
    return <ErrorMessage errors={errors} />;
  };
  render() {
    const { handleSubmit, data } = this.props;

    return (
      <Form onSubmit={handleSubmit} className="login-form">
        {data && data.login.errors ? this.showError(data.login.errors) : null}

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
          <Field
            name="password"
            size="large"
            suffix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            component={InputField}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block size="large">
            Log in
          </Button>
          <a href="/forgot-password">Forgot password?</a>
          <Divider />
          Don’t have an account? <a href="/register">Sign up!</a>
        </FormItem>
      </Form>
    );
  }
}

export default withFormik({
  validationSchema: loginSchema,
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.login({ variables: values });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(LoginView);
