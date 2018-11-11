import React, { Fragment } from "react";
import { Field } from "formik";

import { InputField } from "../../../components/Fields/InputField";
import { TextAreaField } from "../../../components/Fields/TextAreaField";
import { DropdownField } from "../../../components/Fields/DropdownField";
import { DropzoneField } from "../../../components/Fields/DropzoneField";

import { categories } from "@airbnb-clone/common";

export const Step1 = () => {
  return (
    <Fragment>
      <Field
        name="name"
        size="large"
        placeholder="Name"
        component={InputField}
      />

      <Field
        name="description"
        size="large"
        placeholder="Description"
        component={TextAreaField}
      />

      <Field
        name="category"
        size="large"
        placeholder="Category"
        values={categories}
        component={DropdownField}
      />

      <Field
        name="images"
        size="large"
        placeholder="Images"
        component={DropzoneField}
      />
    </Fragment>
  );
};
