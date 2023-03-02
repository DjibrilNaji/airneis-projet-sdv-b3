const Message = (checkoutNumber) => {
  return (
    <>
      <p>
        Votre commande a bien été enregistrée sous le numéro {checkoutNumber} .
        Vous pouvez suivre son état depuis votre espace client.
      </p>
      {/* Composant provisoire en attendant le back afin de changer le numéro de commandes aléatoirement*/}
    </>
  )
}

export default Message
