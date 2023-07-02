# Api documentation

# **CLIENT**

## User authentification

- ### Sign up (**POST** `"/register"`)

This route allows the user to create his account. If the user already exists by his email, no processing will be done.

#### **Here is a `body` type**

```json
{
  "email": "john.doe@example.com",
  "userName": "Jojo",
  "firstName": "John",
  "lastName": "Doe",
  "password": "Password123?"
}
```

- ### Sign-in (**POST** `"/login"`)

This route allows users to connect. When the user uses this route, a token is returned, which will be used to check if he is logged in and if he has the Admin role.

#### **Here is a `body` type**

```json
{
  "email": "jonh.doe@example.com",
  "password": "Password123?"
}
```

- ### Reset password (**POST** `"/resetPassword/reset"`)

This route takes a token and a password as parameters, it checks if the user exists.
Then the password will be hash and salt and will be changed.

- ### Check email (**POST** `"/resetPassword/:email/check"`)

This request sends a validation email to a user specified by their email address, using SendGrid. It first checks if the user exists, is not deleted, and is validated. Then it generates a JWT token and sends an email containing this token to the user. The response returns "true" if the email is sent successfully, otherwise it returns "OK..".

---

- ### Validate account (**POST** `"/confirmation/:token"`)

This request validates a user using a JWT token. It checks the validity of the token, extracts the user's email address, and updates the user's "validate" field to mark it as validated. The response returns a "true" result if the user was successfully validated.

## User account

- ### Return single user (**GET** `"/users/:userId/personnalData"`)

This route returns a single existing user item based on id and fetching with billing address. If the user does not exist, an error message will be returned.

- ### Update user (**PATCH** `"/users/:userId/personnalData"`)

This route allows you to update a user by entering the user id and the fields you want to modify.

#### **Here is a `body` type**

```json
{
  "email": "john.doe@update.com",
  "userName": "Jojo",
  "firstName": "John",
  "lastName": "Doe",
  "password": "UpdatePassword123?"
}
```

- ### Return addresses (**GET** `"/users/:userId/address"`)

This route returns the list of existing addresses of the logged in user.

- ### Add address (**POST** `"/users/:userId/address"`)

This route creates a new address. If the address already exists, an error message will be returned.

#### **Here is a `body` type**

```json
{
  "userId": 3,
  "firstName": "John",
  "lastName": "Doe",
  "addressFull": "3 rue de la paix",
  "addressOptional": "",
  "city": "Rennes",
  "cp": 30000,
  "country": "France",
  "phoneNumber": "0600000000",
  "address_default": true
}
```

- ### Update address (**PATCH** `"/users/address/:addressId/addressSingle"`)

This route allows you to update an address by entering the address id and the fields you want to modify of the logged in user.

#### **Here is a `body` type**

```json
{
  "userId": 3,
  "firstName": "John",
  "lastName": "Doe",
  "addressFull": "3 rue de la paix",
  "addressOptional": "",
  "city": "Bruxelles",
  "cp": 30000,
  "country": "Belgique",
  "phoneNumber": "0600000000",
  "address_default": true
}
```

- ### Delete address (**DELETE** `"/users/address/:addressId/addressSingle"`)

This route 'removes' an address by its id if it exists otherwise it returns a NotFound error of the logged in user. It doesn't actually delete, it just changes the isActive field from true to false.

- ### Add billing address (**POST** `"/users/:userId/billingAddress"`)

This route creates a new billing address.

#### **Here is a `body` type**

```json
{
  "userId": 2,
  "addressFull": "1 rue de la paix",
  "country": "France",
  "cp": 75000,
  "city": "Paris",
  "phoneNumber": "0600000000"
}
```

- ### Update billing address (**PATCH** `"/users/billingAddress/:billingAddressId/edit"`)

This route allows you to update a billing address by entering the billing address id and the fields you want to modify of the logged in user.

#### **Here is a `body` type**

```json
{
  "billingAddressId": 1,
  "addressFull": "1 rue de la paix",
  "city": "Paris",
  "cp": "75000",
  "country": "France",
  "phoneNumber": "0600000000"
}
```

- ### Get orders (**GET** `"/users/:userId/allOrdersUser"`)

This route returns the list of existing orders of the logged in user by fetching with the products of this order.

---

## Categories

- ### Return all categories (**GET** `"/categories"`)

This route returns all categories. If there is no category, an error will be returned.

- ### Return single category (**GET** `"/categories/:slug"`)

This route returns a single category item with its products based on the slug. If the category does not exist or if it is deleted, an error message will be returned.

---

## Products

- ### Return all products (**GET** `"/products"`)

This route returns all products. If there is no product, an error will be returned.

- ### Return single product (**GET** `"/products/:slug"`)

This route returns a single product item based on the slug. If the product does not exist or if it is deleted, an error message will be returned.

---

## Search

- ### Return all products by search (**GET** `"/searchFilter"`)

This route returns the list of existing products with pagination :

- the limit `/searchFilter?limit=2`

- the page number `/searchFilter?page=2`

and a sort in ascending or descending order (asc, desc) :

- the order `/searchFilter?order=desc`

or by other queries :

- the material `/searchFilter?material=wood`

- the minPrice `/searchFilter?minPrice=10`

- the maxPrice `/searchFilter?maxPrice=100`

- the category `/searchFilter?category=chairs`

The results are returned as a JSON object which is an array of existing products.

You can use all these parameters together like : `/searchFilter?limit=2&page=2&order=desc&material=wood&minPrice=10&maxPrice=100&category=chairs`

## Dashboard

- ### (**GET** `"/salesToday"`)

Elle récupère les commandes passées aujourd'hui et calcule le nombre total de commandes et le revenu total généré. Les résultats sont renvoyés sous la forme d'un objet contenant la date, le nombre de commandes et le revenu total, triés par ordre croissant de date.

- ### (**GET** `"/sales"`)

It retrieves the orders and calculates the total order prices for each order creation date. The results are returned as an object containing the order dates and the corresponding total amounts, sorted in ascending order by date.

- ### (**GET** `"/categoriesSales"`)

This query queries the database to obtain the total amount of sales by product category, in a period specified by the startDate and endDate parameters. The results are returned in descending order of amount.

- ### (**GET** `"/averageBasket"`)

This route retrieves product orders and calculates the average order amount for each product category, grouped by order date, in a time period specified by the startDate and endDate parameters. The results are returned as an object containing data grouped by date.

---

## Favorites

- ### Returns all favorites products (**GET** `"/users/:userId/favorites"`)

This route returns the list of existing favorite products of the logged in user.

- ### Return single favorite (**GET** `"/users/:userId/favorites/:slug"`)

This route returns a single existing favorite product item based on slug. If the favorite product does not exist, an error message will be returned.

- ### Add favorite product (**POST** `"/users/:userId/favorites"`)

This route adds a new favorite product. If the favorite product already exists, no processing will be done.

#### **Here is a `body` type**

```json
{
  "userId": 2,
  "productId": 1
}
```

- ### Delete favorite product (**DELETE** `"/users/:userId/favorites"`)

This route removes a favorite product by its id if it exists otherwise it returns a NotFound error.

---

## Contact

- ### Send message (**POST** `"/contact"`)

This route allows the user to send a message to the administrator.

#### **Here is a `body` type**

```json
{
  "email": "john.doe@example.com",
  "subject": "Order 1",
  "message": "My order has not arrived yet"
}
```

---

## Payment

- ### (**POST** `"/payment"`)

This route generates a payment intent that allows us to generate a single form for the payment.

---

# Admin

## Images Home Page

- ### Return all images (**GET** `"/admin/image-home-page"`)

This route returns all images of the home page. If there is no image, an error will be returned.

- ### Update single image (**PATCH** `"/admin/image-home-page/:imageHomePageId"`)

This route allows you to update a single image by entering the image id. This route will pass the display field to true if it is false and to false if it is true.

---

## Categories

- ### Return all categories (**GET** `"/admin/categories/all"`)

This route returns the list of existing categories with pagination :

- the limit `/categories?limit=2`

- the page number `/categories?page=2`

and a sort in ascending or descending order (asc, desc) :

- the order `/categories?order=desc`

and the use of a 'searchTerm' to be able to search from an input in the backoffice :

- the searchTerm `/categories?searchTerm=chair`

The results are returned as a JSON object which is an array of existing categories.

You can use all these parameters together like : `/categories?limit=2&page=2&order=desc&searchTerm=chair`

- ### Return single category (**GET** `"/admin/categories/:categoryId/single"`)

This route returns a single item of existing category based on id. If the category does not exist, an error message will be returned.

- ### Update category (**PATCH** `"/admin/categories/:categoryId/single"`)

This route allows you to update a category by entering the category id and the fields you want to modify.

#### **Here is a `body` type**

```json
{
  "categoryId": 1,
  "name": "Chairs",
  "description": "A beautiful chair for your living-room",
  "slug": "chairs",
  "isDelete": false
}
```

- ### Delete category (**POST** `"/admin/categories/:categoryId/delete"`)

This route 'removes' a category by its id if it exists otherwise it returns a NotFound error. It doesn't actually delete, it just changes the isDelete field from true to false.

---

## Products

- ### Return all products (**GET** `"/admin/products/all"`)

This route returns the list of existing products and fetching with categories and materials with pagination :

- the limit `/products?limit=2`

- the page number `/products?page=2`

and a sort in ascending or descending order (asc, desc) :

- the order `/products?order=desc`

and the use of a 'searchTerm' to be able to search from an input in the backoffice :

- the searchTerm `/products?searchTerm=tabl`

The results are returned as a JSON object which is an array of existing products.

You can use all these parameters together like : `/products?limit=2&page=2&order=desc&searchTerm=tabl`

- ### Return single product (**GET** `"/admin/products/:productId/single"`)

This route returns a single existing product item based on id and fetching with images and materials. If the product does not exist, an error message will be returned.

- ### Update product (**PATCH** `"/admin/products/:productId/single"`)

This route allows you to update a product by entering the product id and the fields you want to modify.

#### **Here is a `body` type**

```json
{
  "productId": 1,
  "name": "Table",
  "description": "A beautiful table for your living-room",
  "price": 19.99,
  "stock": 20,
  "highlander": true,
  "slug": "table"
}
```

- ### Delete product (**PATCH** `"/admin/products/:productId/delete"`)

This route 'removes' a product by its id if it exists otherwise it returns a NotFound error. It doesn't actually delete, it just changes the isDelete field from true to false.

- ### Upload product image on the bucket (**POST** `"/admin/products/upload"`)

When a file is submitted, it is checked out and uploaded to AWS S3. Then, a response indicating the success or failure of the download is returned.

---

## Materials

- ### Return all materials (**GET** `"/admin/materials/all"`)

This route returns the list of existing materials.

---

## Orders

- ### Return all orders (**GET** `"/admin/orders"`)

This route returns the list of existing orders with pagination :

- the limit `/orders?limit=2`

- the page number `/orders?page=2`

and a sort in ascending or descending order (asc, desc) :

- the order `/orders?order=desc`

The results are returned as a JSON object which is an array of existing orders.

- the searchTerm `/orders?searchTerm=john@`

The results are returned as a JSON object which is an array of existing orders.

You can use all these parameters together like : `/orders?limit=2&page=2&order=desc&searchTerm=john@`

- ### Return single order (**GET** `"/admin/orders/:orderId"`)

This route returns a single item of existing orders based on id and fetching with the products of this order. If the orders does not exist, an error message will be returned.

---

## Users

- ### Return all users (**GET** `"/users"`)

This route returns the list of existing users with pagination :

- the limit `/users?limit=2`

- the page number `/users?page=2`

and a sort in ascending or descending order (asc, desc) :

- the order `/users?order=desc`

The results are returned as a JSON object which is an array of existing users.

- the searchTerm `/users?searchTerm=john@`

The results are returned as a JSON object which is an array of existing users.

You can use all these parameters together like : `/users?limit=2&page=2&order=desc&searchTerm=john@`

- ### Return single user (**GET** `"/admin/users/:userId"`)

This route returns a single existing user item based on id and retrieval with billing addresses and addresses. It also returns orders and fetching with the delivery address. If the user does not exist, an error message will be returned.

- ### Update user (**PATCH** `"/admin/users/:userId"`)

This route allows you to update a user by entering the user id and the fields you want to modify.

#### **Here is a `body` type**

```json
{
  "userId": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@update.gmail.com",
  "userName": "john.doe",
  "isAdmin": true,
  "passwordHash": "$2y$10$wI2pPva/s/6Z3eOEiBN7BeQgE88pR9OR7hldanWDfeHbVNYoumcPG",
  "passwordSalt": "$2y$10$wI2pPva/s/6Z3eOEiBN7BeQgE88pR9OR7hldanWDfeHbVNYoumcPG"
```

- ### Delete user (**PATCH** `"/admin/users/:userId/delete"`)

This route 'removes' a user by its id if it exists otherwise it returns a NotFound error. It doesn't actually delete, it just changes the isDelete field from true to false.

---
