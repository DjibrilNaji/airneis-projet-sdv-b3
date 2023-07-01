# web documentation

## Components

In this folder we have all our react components, which we'll use to optimise the code and have default components that can be used on several pages. Our various forms, layouts, etc.

## Hooks

This folder contains two contexts, one for the basket and one for the application. In these contexts we'll mainly find our calls to services, which is what will allow us to call up a desired action on one of our pages, as well as the state if we have a user logged in, for example.

## Services

In this folder we have all our calls to the api with POST, GET, PATCH or DELETE requests.The services also enable us to manage errors more effectively and make them visible.

## Config

This file contains our url base and the name of our main local storage

## Create Api Client

This file allows us to have a global axios call for our services with the implementation of an authorisation if the token is known (if a user is connected).

## Parse Session

This file is used to retrieve the token payload, which contains information about the session we are interested in.

## Routes

This file contains all the site's routes, whether on the api side or the client side.
