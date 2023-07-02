# i18n documentation

## Introduction

To have our website translated in selected languages we used i18n.

## File structure

Locale files are organized in a way that makes it easy to find and modify the correct translations.

#### Here's en example :

```markdown
locales/
ar/
files...
en/
files...
es/
files...
fr/
files...
he/
files...
```

## File format

Locales files in i18n are json files. Each files consist in a pair key value of the original string used everywhre and it's translations.

#### Here's en example :

```json
{
  "Welcome": "Bienvenue",
  "Sign Up": "S'inscrire",
  "Log Out": "Se déconnecter"
}
```

## Language Switcher

We created a Language Switcher to be able in the navbar at every moment to change the language of the website !
