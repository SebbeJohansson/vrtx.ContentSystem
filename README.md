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
![image](https://user-images.githubusercontent.com/5083273/209108405-598d195c-d9f4-4e0d-be43-9f417e51a8c7.png)
3. Login to Storyblok CLI in your command line while in the project directory - yarn storyblok login
![image](https://user-images.githubusercontent.com/5083273/209108425-7cc108a5-35e8-4602-ba69-78e4a748979c.png)
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
