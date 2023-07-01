import * as yup from "yup"
import { Form, Formik } from "formik"
import Button from "@/web/components/Button/Button.jsx"
import FormField from "@/web/components/Form/FormField.jsx"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import FormError from "../Form/FormError.jsx"
import FormSuccess from "../Form/FormSuccess.jsx"

const defaultInitialValues = {
  password: "",
}

const defaultValidationSchema = yup.object().shape({
  password: yup.string().required("Enter a password please").label("Password"),
})

const ResetPasswordForm = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
    error,
    success,
  } = props

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <>
        <FormError error={error} />
        <FormSuccess success={success} />
        <Form className="flex flex-col gap-4 p-4">
          <FormField
            name="password"
            type="password"
            label="Password"
            icon={faLock}
          />
          <Button type="submit">Reset</Button>
        </Form>
      </>
    </Formik>
  )
}

export default ResetPasswordForm
