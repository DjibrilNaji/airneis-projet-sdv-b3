# ÀIRNEIS project

ÀIRNEIS is a Scottish company specializing in the sale of furniture made by Scottish designers.
She wants to develop in the field of e-commerce. They want to create their own e-commerce solution including a mobile-first website, a mobile application for Android and/or iOS, as well as a web backoffice to manage content. The objective is to reach an international clientele while consolidating their local presence. The solution must include a secure payment system and be easily maintainable over the long term.

| Team    |      Job      |
| ------- | :-----------: |
| Djibril | Web developer |
| Thomas  | Web developer |
| Alexis  | Web developer |
| Myriam  | Web developer |

---

### Link to the repo :

https://github.com/DjibrilNaji/airneis-projet-sdv-b3.git

# To use this directory

> Follow these commands on your terminal

```bash
git clone https://github.com/DjibrilNaji/airneis-projet-sdv-b3.git
```

```bash
cd airneis-projet-sdv-b3
```

```bash
npm install
```

> Create your .env with these fields

```dotenv
BASE_URL=http://localhost:3000/api

# Database
DB_CLIENT=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=

# Security
SECURITY__JWT__SECRET=
SECURITY__PASSWORD__PEPPER=

# Mail
ACCESS_KEY_ID_S3=
SECRET_ACCESS_KEY_S3=

# Stripe
STRIPE_PRIVATE_KEY=
```

> When done, run these commands:

```bash
npx knex migrate:latest
```

```
npx knex seed:run
```

```
npm run dev
```

> Your server will be running on : http://localhost:3000

### Accessibility testing :

##### _Installation du CLI pa11y_

Pour l'installation du CLI sur notre environnement de développement on éxécute cette commande :

>

    npm install -g pa11y

##### _Execution du test d'une page_

Pour éxécuter le test d'accessibilité, taper cette commande :

>

    pa11y {l'url de la page à analyser}

###### _Vérification de la passation des corrections_

S'il n'y a aucune erreur au niveau de l'accessibilité, on aura ce message dans le terminal.

>

    Welcome to Pa11y
    > Running Pa11y on URL {l'url de la page à analyser}
    No issues found!
