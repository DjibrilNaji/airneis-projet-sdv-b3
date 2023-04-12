import FormField from "@/web/components/FormField.jsx"
import { Form, Formik } from "formik"
import * as yup from "yup"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import FormError from "../FormError.jsx"
import SubmitButton from "../SubmitButton.jsx"

const defaultInitialValues = {
  addressFull: "",
  city: "",
  cp: "",
  country: "",
  phoneNumber: "",
}

const defaultValidationSchema = yup.object().shape({
  addressFull: yup.string().required().label("addressFull"),
  city: yup.string().required().label("city"),
  cp: yup.number().integer().required().label("cp"),
  country: yup.string().required().label("country"),
  phoneNumber: yup
    .string()
    .required()
    .label("phoneNumber")
    .matches(/[0-9]/)
    .max(10),
})

const BillingAddressForm = (props) => {
  const {
    onSubmit,
    validationSchema = defaultValidationSchema,
    initialValues = defaultInitialValues,
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
            name="addressFull"
            type="text"
            label="addressFull"
            icon={faPerson}
          />
          <FormField name="city" type="text" label="city" icon={faPerson} />
          <FormField name="cp" type="text" label="cp" icon={faPerson} />
          <FormField
            name="country"
            type="text"
            label="country"
            icon={faPerson}
          />
          <FormField
            name="phoneNumber"
            type="text"
            label="phoneNumber"
            icon={faPerson}
          />
        <SubmitButton className="mr-2">Update</SubmitButton>
        </Form>
      </>
    </Formik>
  )
}
export default BillingAddressForm
