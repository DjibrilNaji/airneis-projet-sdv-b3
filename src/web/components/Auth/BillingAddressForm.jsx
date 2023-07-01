import FormField from "@/web/components/Form/FormField.jsx"
import { Form, Formik } from "formik"
import * as yup from "yup"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import FormError from "../Form/FormError.jsx"
import SubmitButton from "../Button/SubmitButton.jsx"

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
    hidden,
  } = props

  return (
    <div hidden={hidden}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <>
          <FormError error={error} />
          <Form className="flex flex-col gap-4 p-4">
            <FormField
              name="addressFull"
              type="text"
              label="Address :"
              icon={faPerson}
            />
            <FormField name="city" type="text" label="City :" icon={faPerson} />
            <FormField name="cp" type="text" label="CP :" icon={faPerson} />
            <FormField
              name="country"
              type="text"
              label="Country :"
              icon={faPerson}
            />
            <FormField
              name="phoneNumber"
              type="text"
              label="Phone Number :"
              icon={faPerson}
            />
            <SubmitButton className="mr-2">Submit</SubmitButton>
          </Form>
        </>
      </Formik>
    </div>
  )
}
export default BillingAddressForm
