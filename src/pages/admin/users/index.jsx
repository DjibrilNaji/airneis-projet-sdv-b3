import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import FormError from "@/web/components/Form/FormError"
import Button from "@/web/components/Button/Button"
import Modal from "@/web/components/Modal"
import EditUserForm from "@/web/components/Admin/Form/EditUserForm"
import UserForm from "@/web/components/Admin/Form/UserForm"
import ConfirmDelete from "@/web/components/Admin/ConfirmDelete"
import ContentPage from "@/web/components/Admin/ContentPage"
import DeleteAllButton from "@/web/components/Admin/Button/DeleteAllButton"
import ModalButtonInfo from "@/web/components/Admin/Button/ModalButtonInfo"
import Dialog from "@/web/components/Design/Dialog"
import CenterItem from "@/web/components/Design/CenterItem"

const UsersAdmin = () => {
  const {
    state: {
      sortColumn,
      order,
      limit,
      selectedItems,
      itemIdToRemove,
      currentPage,
      toggleDeleteOne,
    },
    actions: {
      addUser,
      getUsers,
      deleteUser,
      getSingleUser,
      updateUser,
      setSelectedItems,
      setToggleDeleteOne,
    },
  } = useAppContext()

  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState(null)

  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAddUser, setIsOpenAddUser] = useState(false)
  const [isOpenEditUser, setIsOpenEditUser] = useState(false)
  const [contentDialog, setContentDialog] = useState()

  const [user, setUser] = useState([])
  const [addressSingleUser, setAddressSingleUser] = useState([])
  const [billingAddressSingleUser, setBillingAddress] = useState([])
  const [orderSingleUser, setOrderSingleUser] = useState([])

  const columnsTableHead = [
    {
      displayName: "Select",
      handleSort: false,
    },
    {
      displayName: "Id",
      fieldName: "id",
      handleSort: true,
    },
    {
      displayName: "Email",
      fieldName: "email",
      handleSort: true,
    },
    {
      displayName: "Username",
      fieldName: "username",
      handleSort: true,
    },
    {
      displayName: "Active",
      handleSort: false,
    },
    {
      displayName: "Delete",
      handleSort: false,
    },
    {
      displayName: "More",
      handleSort: false,
    },
  ]

  const types = {
    user: { button: "User", name: "user", title: "User informations" },
    address: {
      button: "Address",
      name: "address",
      title: "Address informations",
    },
    billingAddress: {
      button: "Billing address",
      name: "billingAddress",
      title: "Billing address informations",
    },
    order: { button: "Order", name: "order", title: "Order informations" },
  }

  const [selectedType, setSelectedType] = useState(types.user)
  const [viewUserInfo, setViewUserInfo] = useState(false)
  const [toggleUpdateUser, setToggleUpdateUser] = useState(true)

  const [toggleDeleteSeveral, setToggleDeleteSeveral] = useState()

  const fetchData = useCallback(
    async (page) => {
      const [err, data] = await getUsers(
        limit,
        page,
        sortColumn,
        order,
        searchTerm
      )

      if (err) {
        setError(err)

        return
      }

      const totalUsers = data.result.meta.count
      const totalPages = Math.ceil(totalUsers / limit)

      setTotalPages(totalPages)
      setData(data.result)
    },
    [order, sortColumn, limit, searchTerm, getUsers]
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, fetchData])

  const handleDelete = useCallback(
    async (userId) => {
      const [err] = await deleteUser(userId)

      if (err) {
        setError(err)

        return
      }

      fetchData(currentPage)
      setSelectedItems([])
      setToggleDeleteOne(false)
      setToggleDeleteSeveral(false)
      setContentDialog("The user has been deleted")
      setIsOpen(true)
      setTimeout(() => setIsOpen(false), 3000)
    },
    [fetchData, currentPage, deleteUser, setSelectedItems, setToggleDeleteOne]
  )

  const handleSubmit = useCallback(
    async (values) => {
      const [err, data] = await updateUser(user.id, values)

      if (err) {
        setError(err)

        return
      }

      setUser(data.result)
      setToggleUpdateUser(!toggleUpdateUser)
      setContentDialog("The user has been updated")
      setIsOpenEditUser(true)
      setTimeout(() => setIsOpenEditUser(false), 3000)
      fetchData(currentPage)
    },
    [user.id, toggleUpdateUser, updateUser, fetchData, currentPage]
  )

  const fetchSingleUser = async (id) => {
    const [err, user] = await getSingleUser(id)

    if (err) {
      setError(err)

      return
    }

    setUser(user.result.user[0])
    setAddressSingleUser(user.result.user[0].address)
    setBillingAddress(user.result.user[0].billingAddress)
    setOrderSingleUser(user.result.order)
    setViewUserInfo(true)
  }

  const handleAddUser = useCallback(
    async (values, { resetForm }) => {
      const [err] = await addUser(values)

      if (err) {
        setError(err)

        return
      }

      resetForm()
      setIsOpen(false)
      fetchData(totalPages)
    },
    [addUser, fetchData, totalPages]
  )

  const handleCloseUserInfoModal = useCallback(async () => {
    setToggleUpdateUser(true)
    setViewUserInfo(false)
    setSelectedType(types.user)
  }, [types.user])

  return (
    <>
      <CenterItem
        className="md:hidden"
        content="Use a larger screen to access the backoffice"
      />

      <div className="hidden md:block">
        {error ? <FormError error={error} /> : ""}

        <Dialog isOpen={isOpen} content={contentDialog} />

        <ConfirmDelete
          isOpen={toggleDeleteOne || toggleDeleteSeveral}
          page="users"
          close={
            toggleDeleteSeveral
              ? () => setToggleDeleteSeveral(false)
              : () => setToggleDeleteOne(false)
          }
          remove={
            toggleDeleteSeveral
              ? () => selectedItems.map((id) => handleDelete(id))
              : () => handleDelete(itemIdToRemove)
          }
        />

        <Modal
          isOpen={isOpenAddUser}
          modalTitle="Add"
          closeModal={() => setIsOpenAddUser(false)}
        >
          <UserForm onSubmit={handleAddUser} />
        </Modal>

        <ContentPage
          title="Users"
          data={data.users}
          columnsTableHead={columnsTableHead}
          columnsTableBody={["id", "email", "userName"]}
          name={"users"}
          totalPages={totalPages}
          searchTerm={searchTerm}
          fetchSingleItem={fetchSingleUser}
          onChange={(e) => setSearchTerm(e.target.value)}
          getInfo={true}
          displayIsDelete={true}
          displayDeleteButton={true}
          select={true}
        />

        {data.users?.length > 0 && (
          <div className="flex flex-col justify-start">
            <DeleteAllButton
              className="mx-auto"
              title="Delete all selected users"
              onClick={() => setToggleDeleteSeveral(true)}
              disabled={selectedItems.length === 0}
            />

            <Button onClick={() => setIsOpenAddUser(true)} className="mx-auto">
              Add new user
            </Button>
          </div>
        )}

        <Modal
          isOpen={viewUserInfo}
          modalTitle={selectedType.title}
          closeModal={handleCloseUserInfoModal}
        >
          <div className="flex gap-4">
            {Object.values(types).map((type) => (
              <ModalButtonInfo
                key={type.name}
                title={type.button}
                onClick={() => setSelectedType(type)}
                selectedType={selectedType}
                type={type}
              />
            ))}
          </div>

          {selectedType.name === types.user.name ? (
            <>
              <div className="border-t-4 border-gray-500 px-3 my-4" />
              <div className="flex items-center justify-between ">
                <div className="px-4">
                  {user.isDelete ? (
                    <span className="italic text-red-500 text-lg">
                      (Account deleted : id {user.id})
                    </span>
                  ) : (
                    <span className="italic text-green-500 text-lg">
                      (Active account : id {user.id})
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
              <Dialog isOpen={isOpenEditUser} content={contentDialog} />
            </>
          ) : selectedType.name === types.address.name ? (
            <>
              <div className="border-t-4 border-gray-500 px-3 my-4" />
              {addressSingleUser.length > 0 ? (
                addressSingleUser.map((address, index) => (
                  <div
                    className={`flex flex-col my-3 border-b-2 border-stone-500 px-2 pb-2 ${
                      address.address_default && "bg-stone-300 rounded-lg"
                    } `}
                    key={address.id}
                  >
                    <h2 className="font-bold underline">
                      Address n°{index + 1}{" "}
                      {address.isDelete ? (
                        <span className="italic text-red-500 text-lg">
                          (Deleted)
                        </span>
                      ) : (
                        <span className="italic text-green-500 text-lg">
                          (Active)
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
                  No registered address
                </div>
              )}
            </>
          ) : selectedType.name === types.billingAddress.name ? (
            <>
              <div className="border-t-4 border-gray-500 px-3 my-4" />
              <div>
                {billingAddressSingleUser.length > 0 ? (
                  billingAddressSingleUser.map((address, index) => (
                    <div
                      className="flex flex-col my-3 border-b-2 border-stone-500 px-2 pb-2"
                      key={address.id}
                    >
                      <h2 className="font-bold underline">
                        Address n°{index + 1}
                      </h2>

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
                    No registered address
                  </div>
                )}
              </div>
            </>
          ) : (
            selectedType.name === types.order.name && (
              <>
                <div className="border-t-4 border-gray-500 px-3 my-4" />
                <div>
                  {orderSingleUser.length > 0 ? (
                    orderSingleUser.map((order, index) => (
                      <div
                        className="flex flex-col my-3 border-b-2 border-stone-500 px-2 pb-2"
                        key={order.id}
                      >
                        <h2 className="font-bold underline text-lg">
                          Order n°{index + 1}
                        </h2>
                        <span>Order number : {order.numberOrder}</span>
                        <span>Status : {order.status}</span>
                        <span>Price : {order.price_formatted}</span>
                        <span>VAT : {order.amount_tva_formatted}</span>

                        <div className="flex flex-col my-3 italic">
                          <h3 className="font-bold underline">
                            Delivery address :
                          </h3>
                          <span>{order.address[0].phoneNumber}</span>
                          <span>
                            {order.address[0].addressFull}{" "}
                            {order.address[0].lastName}
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
                      No order placed
                    </div>
                  )}
                </div>
              </>
            )
          )}
        </Modal>
      </div>
    </>
  )
}

UsersAdmin.getLayout = function (page) {
  return (
    <AppContextProvider>
      <LayoutAdmin>{page}</LayoutAdmin>
    </AppContextProvider>
  )
}

export default UsersAdmin
