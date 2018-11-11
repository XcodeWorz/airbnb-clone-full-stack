import React, { Fragment } from "react";
import { Field } from "formik";

import { DropdownField } from "../../../components/Fields/DropdownField";
import { InputField } from "../../../components/Fields/InputField";
import { LocationField } from "../../../components/Fields/LocationField";

import { amenities } from "@airbnb-clone/common";

export const Step3 = () => {
  return (
    <Fragment>
      <Field
        name="location"
        size="large"
        placeholder="Location"
        component={LocationField}
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
