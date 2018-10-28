import React, { Component } from "react";
import { withFormik, Field } from "formik";
import { Form, Icon, Button, Divider } from "antd";

import { InputField } from "../../components/InputField";
import { ErrorMessage } from "./../../components/ErrorMessage";

import { validUserSchema } from "@airbnb-clone/common";

import "./register.less";
const FormItem = Form.Item;

class RegisterView extends Component {
  showError = errors => {
    return <ErrorMessage errors={errors} />;
  };
  render() {
    const { handleSubmit, errors, data } = this.props;

    return (
      <Form onSubmit={handleSubmit} className="login-form">
        {data && data.register.errors
          ? this.showError(data.register.errors)
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
          <Field
            name="firstName"
            size="large"
            suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="First Name"
            component={InputField}
          />
        </FormItem>
        <FormItem>
          <Field
            name="lastName"
            size="large"
            suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Last Name"
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
          <Field
            name="confirmPassword"
            size="large"
            suffix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Confirm Password"
            component={InputField}
          />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block size="large">
            Sign up
          </Button>
          <Divider />
          Already have an Airbnb account? <a href="/login">Log in!</a>
        </FormItem>
      </Form>
    );
  }
}

export default withFormik({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.register({ variables: values });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(RegisterView);
