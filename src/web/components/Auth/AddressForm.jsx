import FormField from "@/web/components/Form/FormField.jsx"
import { Form, Formik, Field } from "formik"
import * as yup from "yup"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import FormError from "@/web/components/Form/FormError.jsx"
import SubmitButton from "@/web/components/Button/SubmitButton.jsx"
import routes from "@/web/routes.js"
import Link from "next/link.js"
import Button from "@/web/components/Button/Button.jsx"

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
  phoneNumber: yup
    .string()
    .required()
    .label("phoneNumber")
    .matches(/[0-9]/)
    .max(10),
  address_default: yup.boolean().label("address default"),
})

const AddressForm = (props) => {
  const {
    onSubmit,
    validationSchema = defaultValidationSchema,
    initialValues = defaultInitialValues,
    userId,
    error,
  } = props

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
    >
      <>
        <FormError error={error} />
        <Form className="flex flex-col gap-4 p-4">
          <div className="flex">
            <FormField
              name="firstName"
              type="text"
              label="First name :"
              icon={faPerson}
              className="pr-4 w-1/2"
            />
            <FormField
              name="lastName"
              type="text"
              label="Last name :"
              icon={faPerson}
              className="w-1/2"
            />
          </div>
          <FormField
            name="addressFull"
            type="text"
            label="Address :"
            icon={faPerson}
          />
          <FormField
            name="addressOptional"
            type="text"
            label="Address Optional :"
            icon={faPerson}
          />
          <div className="flex">
            <FormField
              name="city"
              type="text"
              label="City :"
              icon={faPerson}
              className="pr-4"
            />
            <FormField
              name="cp"
              type="text"
              label="CP :"
              icon={faPerson}
              className="pr-4"
            />
            <FormField
              name="country"
              type="text"
              label="Country :"
              icon={faPerson}
            />
          </div>
          <FormField
            name="phoneNumber"
            type="text"
            label="Phone Number :"
            icon={faPerson}
          />
          <label className="flex gap-2">
            {" "}
            Address default :
            <Field name="address_default" type="checkbox" />
          </label>
          <div className="flex justify-center">
            <SubmitButton className="mr-2">Submit</SubmitButton>
            <Link href={routes.users.single(userId)}>
              <Button>Back</Button>
            </Link>
          </div>
        </Form>
      </>
    </Formik>
  )
}
export default AddressForm
