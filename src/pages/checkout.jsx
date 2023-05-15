import Input from "@/web/components/Input"
import Button from "@/web/components/Button"
import Select from "@/web/components/Select"
import { useState, useEffect } from "react"
import Loader from "@/web/components/LoadingSpinner"
// import axios from "axios"

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const publicState = Checkout.isPublic

  useEffect(() => {
    if (publicState === true) {
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <h1 className="flex text-stone-400 text-3xl justify-center py-5 font-bold md:justify-center">
        Livraison
      </h1>
      <div className="flex justify-center gap-16 p-4">
        <div className="w-long">
          <Select options={["value 1", "value 2"]} />
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
