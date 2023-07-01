import { Form, Formik } from "formik"
import * as yup from "yup"
import FormError from "../../Form/FormError.jsx"
import React from "react"
import FormField from "@/web/components/Form/FormField.jsx"
import SubmitButton from "../../Button/SubmitButton.jsx"

const categoryInitialValues = {
  name: "",
  description: "",
  urlImage: "test.jpg",
}

const categoryValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Un nom de catégorie est obligatoire")
    .label("name"),
  description: yup
    .string()
    .required("Une description est obligatoire")
    .label("description"),
  urlImage: yup
    .string()
    .email("Image Invalide")
    .required("Une image est requise")
    .label("Image"),
})

const CreateCategoryForm = (props) => {
  const {
    onSubmit,
    initialValues = categoryInitialValues,
    validationSchema = categoryValidationSchema,
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
          <FormField name="name" type="text" label="CategoryName" />
          <FormField
            name="description"
            type="text"
            label="CategoryDescription"
          />
          <FormField name="urlImage" type="text" label="CategoryImage" />
          <SubmitButton>Create Category</SubmitButton>
        </Form>
      </>
    </Formik>
  )
}

export default CreateCategoryForm
