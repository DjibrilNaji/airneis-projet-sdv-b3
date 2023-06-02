import * as yup from "yup"
import { Form, Formik } from "formik"
import Button from "@/web/components/Button.jsx"
import FormField from "@/web/components/FormField.jsx"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import FormSuccess from "../FormSuccess.jsx"

const defaultInitialValues = {
  email: "",
}

const defaultValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email invalide")
    .required("Enter a email please")
    .label("Email"),
})

const CheckEmailForm = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
    success,
  } = props

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <>
        <FormSuccess success={success} />
        <Form className="flex flex-col gap-4 p-4">
          <FormField
            name="email"
            type="text"
            label="E-mail"
            icon={faEnvelope}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </>
    </Formik>
  )
}

export default CheckEmailForm
