import React, { Fragment } from "react";
import { Field } from "formik";

import { DropdownField } from "../../../components/Fields/DropdownField";
import { InputField } from "../../../components/Fields/InputField";

const amenities = [
  { id: "wifi", text: "Wi-fi" },
  { id: "parking", text: "Parking" },
  { id: "swimming-pool", text: "Swimming Pool" }
];

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
