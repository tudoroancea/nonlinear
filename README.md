# nonlinear

[![Netlify Status](https://api.netlify.com/api/v1/badges/71e9504d-0ffe-410a-ba11-ca826320a928/deploy-status)](https://app.netlify.com/sites/nonlinearapp/deploys)

This small app was designed to be a _frontend replacement_ for GitHub Projects.
It uses all the data you already have in these projects (the issues and PRs
themselves along with the special metadata defined in the projects, such as
status, priorities, etc.) but in a more user-friendly way.

This app is a client-side frontend only app that directly communicates with the
data your GitHub account has access to (and only this data). No data is stored on
our servers since we don't have any backend.

## Tech stack

This app uses:
- Vite and React
- TypeScript
- Jotai for global state management
- Clerk for authentification
- TailwindCSS for styling
- React Router for routing
- Shadcn/ui for UI components
- Apollo for GraphQL requests
- Bun for package management

## Basic features

1. On the home page we show all the projects available to the user (with some
  explanations as to which projects we show here) and they can select the ones
  they pin on the sidebar (which are persisted to `localStorage`)

## Routes

**bruh**

- **`/home`**: home page
- **`/about`**: about page
- **`/settings`**: settings page
- **`/project/:orgOrUser/:project`**: project page for `orgOrUser/project`
- **`/api/get-github-token`**: backend endpoint to fetch the GitHub token using the Clerk user id.
