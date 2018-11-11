import React, { Component } from "react";
import { withFormik } from "formik";
import { Form, Steps, Button } from "antd";
import styled from "styled-components";

import { ErrorMessage } from "./../../components/ErrorMessage";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";

import { validAirbnbSchema } from "@airbnb-clone/common";

const Step = Steps.Step;
const FormItem = Form.Item;
const steps = [<Step1 />, <Step2 />, <Step3 />];

const FormWrapper = styled.div`
  max-width: 960px;
  margin: 30px auto;
  padding: 0 24px;
  box-sizing: border-box;
`;

const StepsWrapper = styled.div`
  margin-bottom: 30px;
`;

class CreateAirbnbView extends Component {
  state = {
    step: 0
  };

  showError = errors => {
    return <ErrorMessage errors={errors} />;
  };
  nextStep = () => {
    this.setState(state => ({ step: state.step + 1 }));
  };

  prevStep = () => {
    this.setState(state => ({ step: state.step - 1 }));
  };

  render() {
    const { handleSubmit, data, loading } = this.props;

    return (
      <FormWrapper>
        <Form onSubmit={handleSubmit} className="login-form">
          <StepsWrapper>
            <Steps current={this.state.step}>
              {steps.map((item, index) => (
                <Step key={index} />
              ))}
            </Steps>
          </StepsWrapper>
          {data && data.register.errors
            ? this.showError(data.register.errors)
            : null}

          {steps[this.state.step]}
          <FormItem>
            {this.state.step > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={this.prevStep}>
                Previous
              </Button>
            )}
            {this.state.step < steps.length - 1 && (
              <Button type="primary" onClick={this.nextStep}>
                Next
              </Button>
            )}
            {this.state.step === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                disabled={loading}
              >
                Create
              </Button>
            )}
          </FormItem>
        </Form>
      </FormWrapper>
    );
  }
}

export default withFormik({
  validationSchema: validAirbnbSchema,
  mapPropsToValues: () => ({
    name: "",
    description: "",
    category: "",
    image: null,
    price: 0,
    guests: 1,
    beds: 1,
    baths: 1,
    latitude: 0,
    longitude: 0,
    amenities: []
  }),
  handleSubmit: async (values, { props }) => {
    try {
      const data = await props.createAirbnb({ variables: values });
      if (data) await props.onFinish(data);
    } catch (e) {
      console.log(e);
    }
  }
})(CreateAirbnbView);
