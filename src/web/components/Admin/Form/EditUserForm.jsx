import { Form, Formik } from "formik"
import * as yup from "yup"
import React from "react"
import FormError from "@/web/components/FormError"
import SubmitButton from "@/web/components/SubmitButton"
import FormField from "@/web/components/Admin/Form/FormField"

const defaultInitialValues = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isAdmin: "",
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
    .email("L'email est invalide")
    .required("L'email est obligatoire")
    .label("Email"),
  password: yup
    .string()
    .min(8)
    .matches(
      /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
      "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
    )
    .label("Password"),
  isAdmin: yup.boolean().required().label("Admin"),
})

const EditUserForm = (props) => {
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
      enableReinitialize
    >
      <FormError error={error} />
      <Form className="flex flex-col gap-4 p-4">
        <FormField
          name="userName"
          type="text"
          label="Nom d'utilisateur :"
          active={active}
        />
        <FormField
          name="firstName"
          type="text"
          label="Prenom :"
          active={active}
        />
        <FormField name="lastName" type="text" label="Nom :" active={active} />
        <FormField
          name="email"
          type="email"
          label="E-mail* :"
          active={active}
        />
        <FormField
          name="password"
          type="password"
          label="Password :"
          active={active}
        />
        <span>isAdmin :</span>
        <select
          className="font-bold border-stone-500 border focus:border-2 rounded-lg px-2 py-1 focus:outline-none disabled:border-0 disabled:cursor-text"
          disabled={active}
        >
          <option value={1}>true</option>
          <option value={2}>false</option>
        </select>
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
    </Formik>
  )
}
export default EditUserForm
