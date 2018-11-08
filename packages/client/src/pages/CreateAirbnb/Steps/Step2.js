import React, { Fragment } from "react";
import { Field } from "formik";

import { InputField } from "../../../components/Fields/InputField";

export const Step2 = () => {
  return (
    <Fragment>
      <Field
        name="price"
        size="large"
        placeholder="Price"
        useNumberComponent={true}
        component={InputField}
        label="Price"
      />

      <Field
        name="guests"
        size="large"
        placeholder="Guests"
        label="Guests"
        useNumberComponent={true}
        component={InputField}
      />

      <Field
        name="beds"
        size="large"
        useNumberComponent={true}
        label="Beds"
        placeholder="Beds"
        component={InputField}
      />

      <Field
        name="baths"
        size="large"
        label="Baths"
        placeholder="Baths"
        useNumberComponent={true}
        component={InputField}
      />
    </Fragment>
  );
};
