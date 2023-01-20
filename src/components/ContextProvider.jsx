import {
    createContext,
    useContext as useNativeContext,
    useState,
  } from "react"
  
  const initialProducts = [
    {
      idProduct: 1,
      name: "lit double",
      idCategorie: 1,
      nomImage: "litDouble.jpg",
      description: "desckjfbjsfvjhdbhjefbvdjfhv jksfhvjfdvjhskh",
      imagesProducts: [
        {
          nomImageProduct: "litDouble1.jpg",
        },
        {
          nomImageProduct: "litDouble2.jpg",
        }
      ]
    },
    {
        idProduct: 2,
        name: "lit simple",
        idCategorie: 1,
        nomImage: "litSimple.jpg",
        imagesProducts: [{
          nomImageProduct: "litSimple1.jpg",
        },
        {
          nomImageProduct: "litSimple2.jpg",
        }
      ]
    },
    {
        idProduct: 2,
        name: "lit superpose",
        idCategorie: 1,
        nomImage: "litSuperpose.jpg",
        imagesProducts: [{
          nomImageProduct: "litSuperpose1.jpg",
        },
        {
          nomImageProduct: "litSuperpose2.jpg",
        }
      ]
      }
  ]
  
  export const Context = createContext()
  
  export const useContext = () => useNativeContext(Context)
  
  const ContextProvider = (props) => {
    const [products] = useState(initialProducts)
    
    return (
      <Context.Provider
        {...props}
        value={{
          products
        }}
      />
    )
  }
  
  export default ContextProvider