import UserForm from "@/web/components/Admin/Form/UserForm"
import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import config from "@/web/config"
import routes from "@/web/routes"
import {
  faArrowLeft,
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
    </div>
  )
}

ViewUser.getLayout = function (page) {
  return <LayoutAdmin>{page}</LayoutAdmin>
}

export default ViewUser
