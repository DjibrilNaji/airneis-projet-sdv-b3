import { Field, Form, Formik } from "formik"
import * as yup from "yup"
import React from "react"
import FormError from "@/web/components/FormError"
import SubmitButton from "@/web/components/SubmitButton"
import FormField from "@/web/components/Admin/FormField"

const defaultInitialValues = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  highlander: "",
  slug: "",
}

const defaultValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom du produit est obligatoire")
    .label("Name"),
  description: yup
    .string()
    .required("La description est obligatoire")
    .label("description"),
  price: yup
    .number()
    .integer()
    .required("Le prix est obligatoire")
    .label("price"),
  highlander: yup.boolean().required().label("Highlander"),
  slug: yup
    .string()
    .matches(
      /^[a-z]+[a-z-]*$/,
      "The URL cannot contain any capital letters, any numbers, any special characters except '-' to separate certain words"
    )
    .label("Slug"),
})

const EditProductForm = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
    active,
    error,
  } = props

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <>
        <FormError error={error} />
        <Form className="flex flex-col gap-4 p-4">
          <FormField
            name="name"
            type="text"
            label="Nom du Produit :"
            active={active}
          />
          <FormField
            name="description"
            type="text"
            label="Description :"
            active={active}
          />
          <FormField
            name="price"
            type="number"
            label="Prix :"
            active={active}
          />
          <label className="flex flex-col gap-2">
            {" "}
            Highlander
            <Field name="highlander" type="checkbox" disabled={active} />
          </label>
          <FormField name="slug" type="text" label="Slug :" active={active} />
          <SubmitButton
            active={active.toString()}
            color="light"
            variant="secondary"
            size="sm"
            className="disabled:hidden"
          >
            Update
          </SubmitButton>
        </Form>
      </>
    </Formik>
  )
}
export default EditProductForm
