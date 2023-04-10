import UserForm from "@/web/components/Admin/Form/UserForm"
import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import config from "@/web/config"
import routes from "@/web/routes"
import {
  faAddressBook,
  faAddressCard,
  faArrowLeft,
  faBagShopping,
  faCheck,
  faEdit,
  faPerson,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

export const getServerSideProps = async ({ params, req: { url } }) => {
  const userId = params.userId
  const query = Object.fromEntries(
    new URL(`http://example.com/${url}`).searchParams.entries()
  )

  const { data } = await axios.get(
    `${config.api.baseURL}${routes.api.admin.users.single(userId, query)}`
  )

  return {
    props: {
      userInfo: data,
      userId,
    },
  }
}

const ViewUser = (props) => {
  const {
    userInfo: { result },
    userId,
  } = props

  const router = useRouter()
  const [toggleUpdateUser, setToggleUpdateUser] = useState(true)
  const [user, setUser] = useState(result.user[0])

  const handleSubmit = useCallback(
    async ({ firstName, lastName, email, userName }) => {
      const {
        data: { result },
      } = await axios.patch(
        `${config.api.baseApiURL}${routes.api.admin.users.update(userId)}`,
        {
          userName,
          firstName,
          lastName,
          email,
        }
      )

      setUser(result)
      setToggleUpdateUser(!toggleUpdateUser)
    },

    [userId, toggleUpdateUser]
  )

  return (
    <div>
      <div className="m-4">
        <button onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} /> Retour
        </button>
      </div>

      <div className="bg-stone-100 mx-2 my-6">
        <div className="flex items-center justify-between border-b-4 border-red-500 px-3 py-4 ">
          <div className="flex items-center gap-4 ">
            <FontAwesomeIcon icon={faPerson} className="h-6 text-stone-400" />
            <h1 className="font-bold text-xl uppercase">Informations </h1>

            {result.user[0].isDelete ? (
              <span className="italic text-red-500 text-lg">
                (Compte supprimé : id {result.user[0].id})
              </span>
            ) : (
              <span className="italic text-green-500 text-lg">
                (Compte actif : id {result.user[0].id})
              </span>
            )}
          </div>

          {!result.user[0].isDelete && (
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

        <UserForm
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

        {result.address.length > 0 ? (
          result.address.map((address, index) => (
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

        {result.billingAddress.length > 0 ? (
          result.billingAddress.map((address) => (
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

        {result.order.length > 0 ? (
          result.order.map((order, index) => (
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
                <span>{order.phoneNumber}</span>
                <span>
                  {order.addressFull} {order.lastName}
                </span>
                <span>
                  {order.cp} {order.city}
                </span>
                <span>{order.country}</span>
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
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default ViewUser
