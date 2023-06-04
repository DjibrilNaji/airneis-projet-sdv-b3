import LayoutAdmin from "@/web/components/Admin/LayoutAdmin/LayoutAdmin"
import { useCallback, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faEdit,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import TableHeadField from "@/web/components/Admin/TableHeadField"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import FormError from "@/web/components/FormError"
import Button from "@/web/components/Button"
import Modal from "@/web/components/Modal"
import EditUserForm from "@/web/components/Admin/Form/EditUserForm"
import UserForm from "@/web/components/Admin/Form/UserForm"
import SelectShow from "@/web/components/Admin/SelectShow"
import Pagination from "@/web/components/Admin/Pagination"

const UsersAdmin = () => {
  const {
    actions: { addUser, getUsers, deleteUser, getSingleUser, updateUser },
  } = useAppContext()

  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [sortColumn, setSortColumn] = useState("id")
  const [order, setOrder] = useState("asc")
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState(null)

  const [selectedUsers, setSelectedUsers] = useState([])
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const [user, setUser] = useState([])
  const [addressSingleUser, setAddressSingleUser] = useState([])
  const [billingAddressSingleUser, setBillingAddress] = useState([])
  const [orderSingleUser, setOrderSingleUser] = useState([])

  const types = {
    user: { name: "user", title: "User informations" },
    address: { name: "address", title: "Address" },
    billingAddress: { name: "billingAddress", title: "Billing address" },
    order: { name: "order", title: "Order" },
  }

  const [selectedType, setSelectedType] = useState(types.user)
  const [viewUserInfo, setViewUserInfo] = useState(false)
  const [toggleUpdateUser, setToggleUpdateUser] = useState(true)

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
      setSelectedUsers([])
    },
    [fetchData, currentPage, deleteUser]
  )

  const handlePageChange = useCallback(
    (newPage) => {
      setCurrentPage(newPage)
      fetchData(newPage)
    },
    [fetchData]
  )

  const handleLimitChange = useCallback(
    (e) => {
      setLimit(e.target.value)
      setCurrentPage(1)
      fetchData(1)
    },
    [fetchData]
  )

  const handleSortChange = useCallback(
    (column) => {
      if (column === sortColumn) {
        setOrder(order === "asc" ? "desc" : "asc")
      } else {
        setSortColumn(column)
        setOrder("asc")
      }

      fetchData(currentPage)
    },
    [fetchData, currentPage, order, sortColumn]
  )

  const handleSelectItem = useCallback(
    (userId) => {
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter((id) => id !== userId))
      } else {
        setSelectedUsers([...selectedUsers, userId])
      }
    },
    [selectedUsers]
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
      setCurrentPage(totalPages)
      fetchData(totalPages)
    },
    [addUser, fetchData, totalPages]
  )

  return (
    <>
      {error ? <FormError error={error} /> : ""}

      <Modal
        isOpen={isOpen}
        modalTitle="Add"
        closeModal={() => setIsOpen(false)}
      >
        <UserForm onSubmit={handleAddUser} />
      </Modal>

      <div className="flex item-center justify-center mb-5">
        <span className="font-extrabold text-3xl text-stone-500 uppercase">
          Users
        </span>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <div className="flex items-center justify-between">
        <SelectShow
          limit={limit}
          handleLimitChange={handleLimitChange}
          name={"users"}
        />
        <div className="mx-1">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-stone-500 rounded-lg px-2 focus:outline-none"
            value={searchTerm == null ? "" : searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full">
        <thead className="text-xs text-left uppercase bg-gray-50 text-gray-700">
          <tr>
            <th className="py-2 px-1">Select</th>
            <TableHeadField
              displayName="Id"
              handleSortChange={handleSortChange}
              fieldName="id"
            />
            <TableHeadField
              displayName="Email"
              handleSortChange={handleSortChange}
              fieldName="email"
            />
            <TableHeadField
              displayName="Username"
              handleSortChange={handleSortChange}
              fieldName="userName"
            />

            <th className="py-2 px-4">Active</th>
            <th className="py-2 px-1">Actions</th>
            <th className="py-2 px-4">More</th>
          </tr>
        </thead>

        <tbody>
          {data.users?.map((user) => (
            <tr key={user.id} className="border-b text-sm border-gray-300">
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 appearance-none checked:bg-stone-500 cursor-pointer disabled:cursor-not-allowed"
                  disabled={user.isDelete}
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectItem(user.id)}
                />
              </td>
              <td className="py-2 px-4">{user.id} </td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.userName}</td>
              <td className="py-2 px-4">
                {user.isDelete ? (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="h-6 text-red-500"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="h-6 text-green-500"
                  />
                )}
              </td>

              <td className="text-center">
                <button
                  className="disabled:opacity-30 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(user.id)}
                  disabled={user.isDelete}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-stone-400 h-5"
                  />
                </button>
              </td>

              <td className="py-2 px-4 flex">
                <button onClick={() => fetchSingleUser(user.id)}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="border-2 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-stone-400"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col justify-start">
        <button
          className="border-2 rounded-lg my-4 p-2 bg-red-500 text-white disabled:cursor-not-allowed disabled:bg-red-200 mx-auto"
          onClick={() => selectedUsers.map((id) => handleDelete(id))}
          disabled={selectedUsers.length === 0}
        >
          Delete all selected items
        </button>

        <Button onClick={() => setIsOpen(true)} className="mx-auto">
          Add new user
        </Button>
      </div>

      <Modal
        isOpen={viewUserInfo}
        modalTitle={selectedType.title}
        closeModal={() => setViewUserInfo(false)}
      >
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedType(types.user)}
            className={`flex ${
              selectedType.name === types.user.name && "font-bold underline"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setSelectedType(types.address)}
            className={`flex ${
              selectedType.name === types.address.name && "font-bold underline"
            }`}
          >
            Address
          </button>
          <button
            onClick={() => setSelectedType(types.billingAddress)}
            className={`flex ${
              selectedType.name === types.billingAddress.name &&
              "font-bold underline"
            }`}
          >
            Billing address
          </button>
          <button
            onClick={() => setSelectedType(types.order)}
            className={`flex ${
              selectedType.name === types.order.name && "font-bold underline"
            }`}
          >
            Order
          </button>
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
