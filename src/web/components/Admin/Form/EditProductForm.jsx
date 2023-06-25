import { Field, Form, Formik } from "formik"
import * as yup from "yup"
import FormError from "@/web/components/FormError"
import SubmitButton from "@/web/components/SubmitButton"
import FormField from "@/web/components/Admin/Form/FormField"
import { useState } from "react"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const defaultInitialValues = {
  name: "",
  description: "",
  price: "",
  stock: "",
  highlander: "",
  slug: "",
  materials: [],
}

const defaultValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom du produit est obligatoire")
    .label("Name"),
  description: yup
    .string()
    .required("La description est obligatoire")
    .label("description"),
  price: yup.number().required("Le prix est obligatoire").label("price"),
  stock: yup
    .number()
    .integer()
    .required("La quantité en stock est obligatoire")
    .label("stock"),
  highlander: yup.boolean().required().label("Highlander"),
  slug: yup
    .string()
    .matches(
      /^[a-z]+[a-z-]*$/,
      "The URL cannot contain any capital letters, any numbers, any special characters except '-' to separate certain words"
    )
    .label("Slug"),
})

const EditProductForm = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
    material,
    active,
    error,
  } = props

  const [seeMaterials, setSeeMaterials] = useState(false)

  const onClick = () => {
    if (seeMaterials === true) {
      setSeeMaterials(false)
    } else {
      setSeeMaterials(true)
    }
  }

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
          <FormField
            name="name"
            type="text"
            label="Product name:"
            active={active}
          />
          <FormField
            name="description"
            type="text"
            label="Description :"
            active={active}
          />
          <FormField
            name="price"
            type="number"
            label="Price :"
            active={active}
          />
          <FormField
            name="stock"
            type="number"
            label="Stock :"
            active={active}
          />
          <label className="flex gap-2">
            {" "}
            Highlander :
            <Field name="highlander" type="checkbox" disabled={active} />
          </label>
          <FormField name="slug" type="text" label="Slug :" active={active} />
          <div id="checkbox-group">Materials :</div>
          <div
            role="group"
            aria-labelledby="checkbox-group"
            className="w-60 flex flex-wrap"
          >
            {material.map((mat) => (
              <div
                key={mat.id}
                hidden={
                  seeMaterials === false ? (mat.id > 5 ? true : false) : false
                }
              >
                <label>
                  <Field
                    type="checkbox"
                    className="m-2"
                    disabled={active}
                    name="materials"
                    value={mat.nameMaterial}
                  />
                  {mat.nameMaterial}
                </label>
              </div>
            ))}
            <button type="button" onClick={onClick} className="ml-2">
              <FontAwesomeIcon
                icon={seeMaterials ? faMinus : faPlus}
                className="text-stone-400"
              />
            </button>
          </div>
          <SubmitButton
            active={active.toString()}
            color="light"
            variant="secondary"
            size="sm"
            className="disabled:hidden"
          >
            Update
          </SubmitButton>
        </Form>
      </>
    </Formik>
  )
}
export default EditProductForm
