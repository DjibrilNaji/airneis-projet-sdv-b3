import Navbar from "@/components/Navbar"
import Head from "next/head"
import Select from "@/components/Select"
import Input from "@/components/Input"
import Title from "@/components/Title"
import Button from "@/components/Button"
// import Link from "@/components/Link"

const Livraison = () => {
  return (
    <>
      <Head>
        <title>Livraison</title>
      </Head>
      <Navbar />
      <Title className="flex py-4 pl-3 text-stone-400 text-3xl font-bold md:justify-center">
        Livraison
      </Title>
      <div className="flex flex-row justify-center">
        <div className="pb-4 lg:col-start-1 w-long">
          <Select
            options={["Maison", "Décoration d'intérieur"]}
            className="flex items-center border shadow-lg rounded-xl p-2"
          />
          <Input label="Prénom *" />
          <Input label="Nom *" />
          <Input label="Adresse 1 *" />
          <Input label="Adresse 2" />
          <Input label="Ville" />
        </div>
        <div className="lg:pr-8 lg:pl-20 flex flex-col px-3 pb-8 lg:col-start-2 lg:row-span-1 w-long">
          {/* <Link> */}
          <Button className="border-2 border-black text-lg font-bold p-4 bg-stone-400 rounded-xl uppercase">
            Passer au paiement
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </>
  )
}

export default Livraison
