import FormField from "@/web/components/FormField.jsx"
import { Form, Formik } from "formik"
import * as yup from "yup"
import React from "react"
import { faEnvelope, faPerson } from "@fortawesome/free-solid-svg-icons"
import FormError from "./FormError"
import SubmitButton from "./SubmitButton.jsx"

const defaultInitialValues = {
  email: "",
  subject: "",
  message: "",
}

const defaultValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email invalide")
    .required("L'email est obligatoire")
    .label("Email"),
  subject: yup.string().label("Subject"),
  message: yup.string().required("Le message est obligatoire").label("Message"),
})

const ContactForm = (props) => {
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
            name="email"
            type="email"
            label="E-mail*"
            icon={faEnvelope}
          />
          <FormField
            name="subject"
            type="text"
            label="Subject"
            icon={faEnvelope}
          />
          <FormField
            name="message"
            type="text"
            label="Message*"
            icon={faPerson}
          />
          <SubmitButton>Envoyer</SubmitButton>
        </Form>
      </>
    </Formik>
  )
}
export default ContactForm
