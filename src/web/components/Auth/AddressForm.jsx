import FormField from "@/web/components/FormField.jsx"
import { Form, Formik, Field } from "formik"
import * as yup from "yup"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import FormError from "../FormError.jsx"
import SubmitButton from "../SubmitButton.jsx"

const defaultInitialValues = {
  firstName: "",
  lastName: "",
  addressFull: "",
  addressOptional: "",
  city: "",
  cp: "",
  country: "",
  phoneNumber: "",
  address_default: false,
}

const defaultValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Le prenom est obligatoire")
    .label("firstname"),
  lastName: yup.string().required("Le nom est obligatoire").label("lastname"),
  addressFull: yup.string().required().label("addressFull"),
  addressOptional: yup.string().label("addressOptional").nullable(),
  city: yup.string().required().label("city"),
  cp: yup.number().integer().required().label("cp"),
  country: yup.string().required().label("country"),
  phoneNumber: yup.string().required().label("phoneNumber"),
  address_default: yup.boolean().label("address default"),
})

const AddressForm = (props) => {
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
            name="firstName"
            type="text"
            label="firstName"
            icon={faPerson}
          />
          <FormField
            name="lastName"
            type="text"
            label="lastName"
            icon={faPerson}
          />
          <FormField
            name="addressFull"
            type="text"
            label="addressFull"
            icon={faPerson}
          />
          <FormField
            name="addressOptional"
            type="text"
            label="addressOptional"
            value={
              initialValues.addressOptional === null
                ? ""
                : initialValues.addressOptional
            }
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
          <label className="flex flex-col gap-2">
            {" "}
            Address default
            <Field name="address_default" type="checkbox" />
          </label>
          <SubmitButton>Update</SubmitButton>
        </Form>
      </>
    </Formik>
  )
}
export default AddressForm
