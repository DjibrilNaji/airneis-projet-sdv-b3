import { Field, Form, Formik } from "formik"
import * as yup from "yup"
import FormError from "@/web/components/FormError"
import SubmitButton from "@/web/components/SubmitButton"
import FormField from "@/web/components/Admin/Form/FormField"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const defaultInitialValues = {
  name: "",
  description: "",
  price: "",
  stock: "",
  highlander: "",
  slug: "",
  categoryId: "",
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
  highlander: yup.boolean().required().label("Highlander").default(false),
  slug: yup
    .string()
    .matches(
      /^[a-z]+[a-z-]*$/,
      "The URL cannot contain any capital letters, any numbers, any special characters except '-' to separate certain words"
    )
    .label("Slug"),
  categorieId: yup
    .string()
    .required("La categorie est obligatoire")
    .label("Categorie")
    .default("1"),
})

const ProductForm = (props) => {
  const {
    onSubmit,
    onChange,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
    materials,
    categories,
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
    >
      <FormError error={error} />
      <Form className="flex flex-col gap-4 p-4">
        <div className="flex gap-2">
          <FormField
            name="name"
            type="text"
            label="Product name :"
            className="w-2/3"
          />
          <FormField
            name="price"
            type="number"
            label="Price :"
            className="w-1/3"
          />
        </div>
        <FormField name="description" type="text" label="Description :" />
        <div className="flex gap-2">
          <FormField name="slug" type="text" label="Slug :" className="w-2/3" />
          <FormField
            name="stock"
            type="number"
            label="Stock :"
            className="w-1/3"
          />
        </div>
        <label className="flex gap-2">
          {" "}
          Highlander :
          <Field name="highlander" type="checkbox" className="w-4" />
        </label>
        <label className="flex flex-col gap-2">
          {" "}
          Catégory :
          <Field as="select" name="categorieId">
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Field>
        </label>
        <div id="checkbox-group">Materials :</div>
        <div
          role="group"
          aria-labelledby="checkbox-group"
          className="w-72 flex flex-wrap"
        >
          {materials.map((mat) => (
            <div
              key={mat.id}
              hidden={
                seeMaterials === false ? (mat.id > 5 ? true : false) : false
              }
            >
              <label>
                <Field
                  type="checkbox"
                  name="materials"
                  className="m-2"
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
        <FormField
          name="file"
          type="file"
          label="Main Image :"
          onChange={onChange}
        />
        <SubmitButton color="light" variant="secondary" size="sm">
          Submit
        </SubmitButton>
      </Form>
    </Formik>
  )
}
export default ProductForm
