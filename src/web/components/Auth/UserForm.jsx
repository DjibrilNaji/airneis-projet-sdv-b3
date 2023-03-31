import FormField from "@/web/components/FormField.jsx"
import { Form, Formik } from "formik"
import * as yup from "yup"
import React from "react"
import { faEnvelope, faPerson } from "@fortawesome/free-solid-svg-icons"
import FormError from "../FormError.jsx"
import SubmitButton from "../SubmitButton.jsx"

const defaultInitialValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
}

const defaultValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .required("L'identifiant est obligatoire")
    .label("username"),
  firstName: yup
    .string()
    .required("Le prenom est obligatoire")
    .label("firstname"),
  lastName: yup.string().required("Le nom est obligatoire").label("lastname"),
  email: yup
    .string()
    .email("email invalide")
    .required("L'email est obligatoire")
    .label("Email"),
})

const UserForm = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
    error,
    hidden = false,
  } = props

  return (
    <div hidden={hidden}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <>
          <FormError error={error} />
          <Form className="flex flex-col gap-4 p-4">
            <FormField
              name="userName"
              type="text"
              label="Identifiant"
              icon={faPerson}
            />
            <FormField
              name="firstName"
              type="text"
              label="Prenom"
              icon={faPerson}
            />
            <FormField
              name="lastName"
              type="text"
              label="Nom"
              icon={faPerson}
            />
            <FormField
              name="email"
              type="email"
              label="E-mail*"
              icon={faEnvelope}
            />
            <SubmitButton>Update</SubmitButton>
          </Form>
        </>
      </Formik>
    </div>
  )
}
export default UserForm
