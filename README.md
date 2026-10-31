# The Last Ember

A small community website for The Last Ember, an Enshrouded community. It uses React, TypeScript, Vite, and React Router.

## Development

Use Node.js 24.

```sh
npm install
npm run dev
npm run lint
npm run build
```

`npm run build` writes the deployable static site to `dist/`.

## Nginx Routes

The site uses browser-history routing. Configure Nginx to return the application entry point for routes that are not static files, so direct visits and browser refreshes work:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

No production infrastructure is configured by this repository.
