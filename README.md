# vrtx ContentSystem

Uses [nuxt3](https://v3.nuxtjs.org) and [storyblok](https://www.storyblok.com/).

-----
## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

### Storyblok

How to set up Vrtx.ContentSystem with Storyblok:
1. Create a new Storyblok Space - https://app.storyblok.com/#/me/spaces/new
2. Login to Storyblok CLI in your command line while in the project directory - yarn storyblok login
![image](https://user-images.githubusercontent.com/5083273/209108425-7cc108a5-35e8-4602-ba69-78e4a748979c.png)
3. Push the Vrtx.ContentSystem components to your new Storyblok space - yarn storyblok push-components --space {your-space-id} storyblok/components.vrtx.json
4. Remove all the components that does not belong to vrtx.ContentSystem - yarn storyblok delete-components storyblok/components.vrtx.json --space {your-space-id} --reverse
5. ???
6. You are now ready to create content in Storyblok

(To update the component file, use yarn storyblok pull-components --space {your-space-id} to generate new files)

-----
## Development Server

Start the development server on http://localhost:3000

```bash
yarn run dev
```
-----

## Production

Build the application for production:

```bash
yarn run build
```

Locally preview production build:

```bash
yarn run preview
```

-----

## Creating Content

### Storyblok

#### Home page

Since the home page requires some special care because of the fact that we cant have the root page have the slug "/" we need to have the slug as index.

1. Create a new story with the type "Content Page".
2. Name it anything.
3. Put 'slug' as "index" - That way Vrtx.ContentSystem knows its the home page.
![image](https://user-images.githubusercontent.com/5083273/209223681-42067716-ddfd-4ce8-bd12-4dab30f7ce15.png)
4. Add content.
5. Publish.

#### Header Menu

Since menu is special it needs to be of the content type 'Menu' and have the 'slug' "menu" .

1. Create a new story with the type "Menu".
2. Name it anything.
3. Put 'slug' as "menu" - That way Vrtx.ContentSystem knows its the menu.
![image](https://user-images.githubusercontent.com/5083273/209223706-375e4da4-c7c6-4e3e-9c16-f46b6ce17aac.png)
4. Add a few departments (each department is a menu option).
5. Publish.

#### Footer Menu

Since footer is special it needs to be of the content type 'Menu' and have the 'slug' "footer".

1. Create a new story with the type "Menu".
2. Name it anything.
3. Put 'slug' as "footer" - That way Vrtx.ContentSystem knows its the footer.
![image](https://user-images.githubusercontent.com/5083273/209223714-9739a9c7-6f17-4121-a644-facb2bd6dc23.png)
4. Add a few departments (each department is a footer option).
5. Publish.

-----
## Creating a private fork

Sometimes you might wanna create a private fork (even if the license and github don't allow it). The easiest way to create a private version is to use the template function:
![image](https://user-images.githubusercontent.com/5083273/211059583-369d028a-a853-4151-8cbe-213531cd083f.png)
![image](https://user-images.githubusercontent.com/5083273/211059417-bd2d7127-0eef-46d2-9e7c-231828ba0286.png)

The other option is to manually create a repo and add the repo as an upstream you can pull from. If you want to do that do this:
1. Create an empty private repo.
2. Clone the empty repo locally.
3. Add Vrtx.ContentSystem repo as an upstream with: `git remote add upstream https://github.com/SebbeJohansson/Vrtx.ContentSystem.git`
4. Disable pushing to upstream (since you are not allowed to do that either way): `git remote set-url --push upstream DISABLE`
5. Pull main from the upstream: `git pull upstream/main main`
6. Fix any potential merge issues.
