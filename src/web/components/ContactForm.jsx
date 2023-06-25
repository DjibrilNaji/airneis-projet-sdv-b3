import FormField from "@/web/components/FormField.jsx"
import { Form, Formik } from "formik"
import * as yup from "yup"
import React from "react"
import { faEnvelope, faPerson } from "@fortawesome/free-solid-svg-icons"
import FormError from "./FormError"
import SubmitButton from "./SubmitButton.jsx"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

const ContactForm = (props) => {
  const { t } = useTranslation("contact")
  const { locale } = useRouter()
  const direction = t("direction", { locale })

  const defaultInitialValues = {
    email: "",
    subject: "",
    message: "",
  }

  const defaultValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("yup_email"))
      .required(t("yup_email_required"))
      .label(t("yup_email_label")),
    subject: yup.string().label(t("yup_subject_label")),
    message: yup
      .string()
      .required(t("yup_email_required"))
      .label(t("yup_email_label")),
  })

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
      <FormError error={error} />

      <Form className="flex flex-col gap-4 p-4">
        <FormField
          dir={direction}
          name="email"
          type="email"
          label={`${t("email")} *`}
          icon={faEnvelope}
        />
        <FormField
          dir={direction}
          name="subject"
          type="text"
          label={`${t("subject")} *`}
          icon={faEnvelope}
        />
        <FormField
          dir={direction}
          name="message"
          type="textarea"
          label={`${t("message")} *`}
          icon={faPerson}
        />
        <SubmitButton>{t("send_message")}</SubmitButton>
      </Form>
    </Formik>
  )
}
export default ContactForm
