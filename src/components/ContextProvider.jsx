import {
    createContext,
    useContext as useNativeContext,
    useState,
} from "react"

    const InitialCategories = [
    {
        idCategorie : 1,
        nameCategorie : "Literie",
        imageCategorie: "catLiterie.jpg",
        description: "Description Description Description Description Description Description "
    },
    {
        idCategorie : 2,
        nameCategorie : "Armoire",
        imageCategorie: "catArmoire.jpg",
        description: "Description Description Description Description Description Description "
    },
]

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
      },
    {
        idProduct: 3,
            name: "lit superposé",
        idCategorie: 1,
        nomImage: "litSuperpose.jpg",
    },
    {
        idProduct: 3,
            name: "lit haut de gamme",
        idCategorie: 1,
        nomImage: "litHautGamme.jpg",
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
            const [categories] = useState(InitialCategories)


        return (
            <Context.Provider
                {...props}
                value={{
                    products,
                    categories,
                }}
            />
        )
    }

export default ContextProvider