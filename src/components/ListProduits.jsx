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
      <ul className={classNames("grid grid-cols-3 gap-3 justify-items-center mt-16", className)}>
          {Object.values(products).map((value, index) => value["idCategorie"] === idCategorie ? (
            <li key={index} >
                <Link href={`${idCategorie}/categorie/${value["idProduct"]}`} className="relative">
                  <ImageDefault src={`/assets/img/produitImg/${value["nomImage"]}`} alt="image" width="500" height="500" className="w-80 h-64 border-solid border-4 border-black rounded-lg"/>
                  <Title className="z-0 inline-block absolute text-xl text-center font-serif font-bold top-28 w-full">{value["name"]}</Title>
                </Link>
            </li>
          ) : "" )}
          </ul>
    </div>
     )
}

export default ListProduits