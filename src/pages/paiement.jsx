import Navbar from "@/components/Navbar"
import Head from "next/head"
import Select from "@/components/Select"
import Input from "@/components/Input"
import Title from "@/components/Title"
import Button from "@/components/Button"
// import Link from "@/components/Link"

const Paiement = () => {
  return (
    <>
      <Head>
        <title>Paiement</title>
      </Head>
      <Navbar />
      <Title className="flex py-4 pl-3 text-stone-400 text-3xl font-bold md:justify-center">
        Paiement
      </Title>
      <div className="flex flex-row justify-center">
        <div className="pb-4 lg:col-start-1 w-long">
          <Select
            options={["Master Card 0492", "Master Card 0495"]}
            className="flex items-center border shadow-lg rounded-xl p-2"
          />
          <Input label="Card Number *" />
          <Input label="Nom complet *" />
          <span className="flex">
            <Input label="Date d'expiration *" />
            <p className="lg:pl-11"></p>
            <Input label="CVV *" />
          </span>
        </div>
        <div className="lg:pr-8 lg:pl-20 flex flex-col px-3 pb-8 lg:col-start-2 lg:row-span-1 w-long">
          {/* <Link> */}
          <Button className="border-2 border-black text-lg font-bold p-4 bg-stone-400 rounded-xl uppercase">
            Payer
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </>
  )
}

export default Paiement
