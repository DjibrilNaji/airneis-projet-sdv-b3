import Input from "@/components/Input"
import Button from "@/components/Button"
import Select from "@/components/Select"
import { useState, useEffect } from "react"
import axios from "axios"

const Checkout = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data)
    })
  }, [])

  const CheckoutCategories = categories.map((category) => category.name)

  return (
    <>
      <h1 className="flex text-stone-400 text-3xl justify-center py-5 font-bold md:justify-center">
        Livraison
      </h1>
      <div className="flex justify-center gap-16 p-4">
        <div className="w-long">
          <Select options={CheckoutCategories} />
          <Input label="Prénom *" />
          <Input label="Nom *" />
          <Input label="Adresse *" />
          <Input label="Code postal" />
          <Input label="Ville" />
        </div>
        <div className="py-7">
          {/* <Link> */}
          <Button>Passer au paiement</Button>
          {/* </Link> */}
        </div>
      </div>
    </>
  )
}

export default Checkout
