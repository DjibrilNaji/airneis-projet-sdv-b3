import FormField from "@/web/components/Form/FormField.jsx"
import { Form, Formik } from "formik"
import * as yup from "yup"
import FormError from "@/web/components/Form/FormError.jsx"
import { useRouter } from "next/router.js"
import { useTranslation } from "next-i18next"
import Button from "@/web/components/Button/Button.jsx"

const AddressForm = (props) => {
  const { t } = useTranslation("address")
  const { locale } = useRouter()
  const direction = t("direction", { locale })

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
    firstName: yup.string().required(t("yup_firstName_required")),
    lastName: yup.string().required(t("yup_lastName_required")),
    addressFull: yup.string().required(t("yup_full_address_required")),
    addressOptional: yup.string().nullable(),
    city: yup.string().required(t("yup_city_required")),
    cp: yup.number().integer().required(t("yup_cp_required")),
    country: yup.string().required(t("yup_country_required")),
    phoneNumber: yup
      .string()
      .required(t("yup_phoneNumber_required"))
      .matches(/[0-9]/)
      .max(10),
  })

  const {
    onSubmit,
    validationSchema = defaultValidationSchema,
    initialValues = defaultInitialValues,
    updateAddress,
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
        <Form className="flex flex-col gap-4 py-4">
          <FormField
            dir={direction}
            name="firstName"
            type="text"
            label={`${t("firstName")} *`}
          />
          <FormField
            dir={direction}
            name="lastName"
            type="text"
            label={`${t("lastName")} *`}
          />
          <FormField
            dir={direction}
            name="addressFull"
            type="text"
            label={`${t("full_address")} *`}
          />
          <FormField
            dir={direction}
            name="addressOptional"
            type="text"
            label={`${t("optional_address")}`}
          />
          <FormField
            dir={direction}
            name="city"
            type="text"
            label={`${t("city")} *`}
          />
          <FormField
            dir={direction}
            name="cp"
            type="text"
            label={`${t("cp")} *`}
          />
          <FormField
            dir={direction}
            name="country"
            type="text"
            label={`${t("country")} *`}
          />
          <FormField
            dir={direction}
            name="phoneNumber"
            type="text"
            label={`${t("phoneNumber")} *`}
          />
          <Button type="submit">
            {updateAddress ? t("update_address_btn") : t("add_address_btn")}
          </Button>
        </Form>
      </>
    </Formik>
  )
}
export default AddressForm
