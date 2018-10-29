import React, { Component } from "react";
import { withFormik, Field } from "formik";
import { Form, Icon, Button } from "antd";

import { InputField } from "../../components/InputField";
import { ErrorMessage } from "./../../components/ErrorMessage";
import { changePasswordSchema } from "@airbnb-clone/common";

import "./login.less";
const FormItem = Form.Item;

class ChangePasswordView extends Component {
  showError = errors => {
    return <ErrorMessage errors={errors} />;
  };
  render() {
    const { handleSubmit, data } = this.props;
    return (
      <Form onSubmit={handleSubmit} className="login-form">
        {data && data.changePassword && data.changePassword.path
          ? this.showError([
              {
                path: data.changePassword.path,
                message: data.changePassword.message
              }
            ])
          : null}

        <FormItem>
          <Field
            name="newPassword"
            type="password"
            size="large"
            suffix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="New Password"
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
  validationSchema: changePasswordSchema,
  mapPropsToValues: () => ({
    newPassword: ""
  }),
  handleSubmit: async ({ newPassword }, { props }) => {
    try {
      const data = await props.changePassword({
        variables: {
          newPassword,
          key: props.token
        }
      });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(ChangePasswordView);
