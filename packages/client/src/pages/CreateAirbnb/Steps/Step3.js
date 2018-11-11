import React, { Fragment } from "react";
import { Field } from "formik";

import { DropdownField } from "../../../components/Fields/DropdownField";
import { InputField } from "../../../components/Fields/InputField";

import { amenities } from "@airbnb-clone/common";

export const Step3 = () => {
  return (
    <Fragment>
      <Field
        name="latitude"
        size="large"
        placeholder="Latitude"
        style={{ width: "100%" }}
        useNumberComponent={true}
        component={InputField}
      />
      <Field
        name="longitude"
        size="large"
        style={{ width: "100%" }}
        placeholder="Longitude"
        useNumberComponent={true}
        component={InputField}
      />
      <Field
        name="amenities"
        size="large"
        placeholder="Amenities"
        tagMode={true}
        values={amenities}
        component={DropdownField}
      />
    </Fragment>
  );
};
