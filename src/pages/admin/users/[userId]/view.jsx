import EditUserForm from "@/web/components/Admin/Form/EditUserForm"
import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import BackButton from "@/web/components/BackButton"
import FormError from "@/web/components/FormError"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import {
  faAddressBook,
  faAddressCard,
  faBagShopping,
  faCheck,
  faEdit,
  faPerson,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useEffect, useState } from "react"

export const getServerSideProps = async ({ params }) => {
  const userId = params.userId

  return {
    props: {
      userId,
    },
  }
}

const ViewUser = (props) => {
  const { userId } = props

  const {
    actions: { getSingleUser, updateUser },
  } = useAppContext()

  const [toggleUpdateUser, setToggleUpdateUser] = useState(true)
  const [error, setError] = useState("")
  const [user, setUser] = useState([])
  const [address, setAddress] = useState([])
  const [billingAddress, setBillingAddress] = useState([])
  const [order, setOrder] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getSingleUser(userId)

      if (err) {
        setError(err)

        return
      }

      setUser(data.result.user[0])
      setAddress(data.result.user[0].address)
      setBillingAddress(data.result.user[0].billingAddress)
      setOrder(data.result.order)
    }
    fetchData()
  }, [getSingleUser, userId])

  const handleSubmit = useCallback(
    async (values) => {
      const [err, data] = await updateUser(userId, values)

      if (err) {
        setError(err)

        return
      }

      setUser(data.result)
      setToggleUpdateUser(!toggleUpdateUser)
    },
    [userId, toggleUpdateUser, updateUser]
  )

  return (
    <div>
      {error ? <FormError error={error} /> : ""}

      <BackButton />

      <div className="bg-stone-100 mx-2 my-6">
        <div className="flex items-center justify-between border-b-4 border-red-500 px-3 py-4 ">
          <div className="flex items-center gap-4 ">
            <FontAwesomeIcon icon={faPerson} className="h-6 text-stone-400" />
            <h1 className="font-bold text-xl uppercase">Informations </h1>

            {user.isDelete ? (
              <span className="italic text-red-500 text-lg">
                (Compte supprimé : id {user.id})
              </span>
            ) : (
              <span className="italic text-green-500 text-lg">
                (Compte actif : id {user.id})
              </span>
            )}
          </div>

          {!user.isDelete && (
            <button
              className="flex justify-end text-stone-500 font-bold text-lg rounded"
              onClick={() => setToggleUpdateUser(!toggleUpdateUser)}
              title={
                toggleUpdateUser
                  ? "Modifier l'utilisateur"
                  : "Finir les modifications"
              }
            >
              <FontAwesomeIcon
                icon={toggleUpdateUser ? faEdit : faCheck}
                className="h-7"
              />
            </button>
          )}
        </div>

        <EditUserForm
          initialValues={user}
          onSubmit={handleSubmit}
          active={toggleUpdateUser}
        />
      </div>

      <div className="bg-stone-100 mx-2 my-6">
        <div className="flex items-center gap-4 uppercase text-xl border-b-4 border-red-500 px-3 py-4">
          <FontAwesomeIcon
            icon={faAddressBook}
            className="h-6 text-stone-400"
          />
          <h1 className="font-bold">Carnet d'adresses</h1>
        </div>

        {address.length > 0 ? (
          address.map((address, index) => (
            <div
              className="flex flex-col my-3 border-b-2 border-stone-500 px-2 pb-2"
              key={address.id}
            >
              {address.address_default ? (
                <span className="bg-red-500 text-white px-2">
                  Adresse principale
                </span>
              ) : (
                ""
              )}
              <h2 className="font-bold underline">
                Adresse n°{index + 1}{" "}
                {address.isDelete ? (
                  <span className="italic text-red-500 text-lg">
                    (Addresse supprimé)
                  </span>
                ) : (
                  <span className="italic text-green-500 text-lg">
                    (Address actif)
                  </span>
                )}
              </h2>
              <span>
                {address.firstName} {address.lastName}
              </span>
              <span>
                {address.addressFull} {address.lastName}
              </span>
              <span>
                {address.cp} {address.city}
              </span>
              <span>{address.country}</span>
            </div>
          ))
        ) : (
          <div className="p-4 text-lg font-semibold">
            Aucune addresse enregistré
          </div>
        )}
      </div>

      <div className="bg-stone-100 mx-2 my-6">
        <div className="flex items-center gap-4 uppercase text-xl border-b-4 border-red-500 px-3 py-4">
          <FontAwesomeIcon
            icon={faAddressCard}
            className="h-6 text-stone-400"
          />
          <h1 className="font-bold">Adresse de facturation</h1>
        </div>

        {billingAddress.length > 0 ? (
          billingAddress.map((address) => (
            <div
              className="flex flex-col my-3 border-b-2 border-stone-500 px-2 pb-2"
              key={address.id}
            >
              <span>{address.phoneNumber}</span>

              <span>
                {address.addressFull} {address.lastName}
              </span>

              <span>
                {address.cp} {address.city}
              </span>

              <span>{address.country}</span>
            </div>
          ))
        ) : (
          <div className="p-4 text-lg font-semibold">
            Aucune addresse enregistré
          </div>
        )}
      </div>

      <div className="bg-stone-100 mx-2 my-6">
        <div className="flex items-center gap-4 uppercase text-xl border-b-4 border-red-500 px-3 py-4">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="h-6 text-stone-400"
          />
          <h1 className="font-bold">Commandes</h1>
        </div>

        {order.length > 0 ? (
          order.map((order, index) => (
            <div
              className="flex flex-col my-3 border-b-2 border-stone-500 px-2 pb-2"
              key={order.id}
            >
              <h2 className="font-bold underline text-lg">
                Commande n°{index + 1}
              </h2>
              <span>Numéro de commande : {order.numberOrder}</span>
              <span>Status : {order.status}</span>
              <span>Price : {order.price_formatted}</span>
              <span>TVA : {order.amount_tva_formatted}</span>

              <div className="flex flex-col my-3 italic">
                <h3 className="font-bold underline">Address de livraison :</h3>
                <span>{order.address[0].phoneNumber}</span>
                <span>
                  {order.address[0].addressFull} {order.address[0].lastName}
                </span>
                <span>
                  {order.address[0].cp} {order.address[0].city}
                </span>
                <span>{order.address[0].country}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-lg font-semibold">
            Aucune commande passée
          </div>
        )}
      </div>
    </div>
  )
}

ViewUser.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default ViewUser
