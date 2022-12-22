# Vrtx ContentSystem

Uses [nuxt3](https://v3.nuxtjs.org) and [storyblok](https://www.storyblok.com/).

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

### Storyblok

How to set up Vrtx.ContentSystem with Storyblok:
```
1. Create a new Storyblok Space - https://app.storyblok.com/#/me/spaces/new
2. Remove default content types - https://app.storyblok.com/#/me/spaces/{your-space-id}/components
{{insert image}}
3. Login to Storyblok CLI in your command line while in the project directory - yarn storyblok login
{{insert image}}
4. Push the Vrtx.ContentSystem components to your new Storyblok space - yarn storyblok push-components --space {your-space-id} storyblok/components.vrtx.json
5. ???
6. You are now ready to create content in Storyblok

(To update the component file, use yarn storyblok pull-components --space {your-space-id} to generate new files)
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn run dev
```

## Production

Build the application for production:

```bash
yarn run build
```

Locally preview production build:

```bash
yarn run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
