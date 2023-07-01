import FormField from "@/web/components/Form/FormField.jsx"
import { Form, Formik } from "formik"
import * as yup from "yup"
import TextAuth from "@/web/components/Auth/TextAuth.jsx"
import React from "react"
import { faEnvelope, faLock, faPerson } from "@fortawesome/free-solid-svg-icons"
import FormError from "@/web/components/Form/FormError.jsx"
import SubmitButton from "@/web/components/Button/SubmitButton.jsx"

const defaultInitialValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
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
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .label("Password"),
})

const RegisterForm = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
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
          <FormField name="lastName" type="text" label="Nom" icon={faPerson} />
          <FormField
            name="email"
            type="email"
            label="E-mail*"
            icon={faEnvelope}
          />
          <FormField
            name="password"
            type="password"
            label="Password*"
            icon={faLock}
          />
          <TextAuth
            route="./login"
            text1="Déjà un compte ?"
            text2="Connectez-vous"
            button="S'inscrire"
          />
          <SubmitButton>S'inscrire</SubmitButton>
        </Form>
      </>
    </Formik>
  )
}
export default RegisterForm
