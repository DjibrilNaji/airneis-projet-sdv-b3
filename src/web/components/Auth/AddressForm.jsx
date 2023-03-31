import FormField from "@/web/components/FormField.jsx"
import { Form, Formik } from "formik"
import * as yup from "yup"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { faPerson } from "@fortawesome/free-solid-svg-icons"
import FormError from "../FormError.jsx"
import SubmitButton from "../SubmitButton.jsx"
import axios from "axios"
import routes from "@/web/routes.js"

const defaultInitialValues = {
  firstName: "",
  lastName: "",
  addressFull: "",
  addressOptional: "",
  city: "",
  cp: "",
  country: "",
  phoneNumber: "",
}

const defaultValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Le prenom est obligatoire")
    .label("firstname"),
  lastName: yup.string().required("Le nom est obligatoire").label("lastname"),
  addressFull: yup.string().required().label("addressFull"),
  addressOptional: yup.string().label("addressOptional"),
  city: yup.string().required().label("city"),
  cp: yup.number().integer().required().label("cp"),
  country: yup.string().required().label("country"),
  phoneNumber: yup.string().required().label("phoneNumber"),
})

const AddressForm = (props) => {
  const {
    onSubmit,
    validationSchema = defaultValidationSchema,
    error,
    hidden,
    userId,
    token,
    addressUser,
  } = props

  const [initialValues, setInitialValues] = useState(defaultInitialValues)

  const testFetchData = useMemo(
    () => (add) => {
      async function fetchData(add) {
        const addressFetch = await axios.get(
          `http://localhost:3000/api${routes.api.users.addressSingle(
            userId,
            add
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setInitialValues(addressFetch.data.result[0])
      }
      fetchData(add)
    },
    [token, userId]
  )

  useEffect(() => {
    testFetchData(addressUser[0].addressFull)
  }, [addressUser, testFetchData])

  const handleChange = useCallback(
    (event) => {
      testFetchData(event.target.value)
    },
    [testFetchData]
  )

  return (
    <div hidden={hidden}>
      <select onChange={handleChange}>
        {addressUser.map((address, index) => (
          <option key={index} value={address.addressFull}>
            {address.addressFull}
          </option>
        ))}
      </select>

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
              value={initialValues.firstName}
              icon={faPerson}
            />
            <FormField
              name="lastName"
              type="text"
              label="lastName"
              value={initialValues.lastName}
              icon={faPerson}
            />
            <FormField
              name="addressFull"
              type="text"
              label="addressFull"
              value={initialValues.addressFull}
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
            <FormField
              name="city"
              type="text"
              label="city"
              icon={faPerson}
              value={initialValues.city}
            />
            <FormField
              name="cp"
              type="text"
              label="cp"
              icon={faPerson}
              value={initialValues.cp}
            />
            <FormField
              name="country"
              type="text"
              label="country"
              value={initialValues.country}
              icon={faPerson}
            />
            <FormField
              name="phoneNumber"
              type="text"
              label="phoneNumber"
              value={initialValues.phoneNumber}
              icon={faPerson}
            />
            <SubmitButton>Update</SubmitButton>
          </Form>
        </>
      </Formik>
    </div>
  )
}
export default AddressForm
