import classNames from "classnames"
import ImageDefault from "./ImageDefault"
import Title from "@/components/Title"
import Link from "./Link"

const ListProduits = (props) => {
  const {
    className,
    idCategorie,
    products
  } = props
  
  return (
    <div>
      <ul className={classNames("grid grid-cols-1 justify-items-center mt-10 md:grid-cols-2 lg:grid-cols-3 gap-3", className)}>
          {Object.values(products).map((value, index) => value["idCategorie"] === idCategorie ? (
            <li key={index} className="pb-4">
              <Link href={`${value["idProduct"]}/produit`} className="relative">
                <ImageDefault src={`/assets/img/produitImg/${value["nomImage"]}`} alt="image" width="500" height="500"
                  className="border-solid border-4 border-black rounded-lg w-96 h-64" />
                <Title className="z-0 inline-block absolute text-xl text-center font-serif font-bold top-28 w-full">
                  {value["name"]}
                </Title>
              </Link>
            </li>
          ) : "" )}
          </ul>
    </div>
     )
}

export default ListProduits