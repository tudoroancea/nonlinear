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

## Current features

- On the home page we show all the projects available to the user (with some
  explanations as to which projects we show here) and they can select the ones
  they pin on the sidebar (which are persisted to `localStorage`)

- Display as a list all the issues in a project (no PRs) with some info:
  - url to link to github
  - issue number
  - labels
  - status (detected by field name 'status' or 'Status' or equivalent)
  - assignee(s)
  These issues and fields are read/write.

## Future features

- Add grid view
- Add sort, filtering
- Add more metadata for issues:
  - branches and PRs
  - priority
  - milestone
  - parent/child issues
- Add issue body in a detailed view
- Add PRs in projects
- Add support for existing views ??
  > _This one could be a **big** selling point, but would have multiple implications._
  > _One of them would be that GitHub only supports board, table and roadmap views._
  > _We can temporarily support only a subset of those but we could not create new types..._

## Routes


- **`/home`**: home page
- **`/about`**: about page
- **`/settings`**: settings page
- **`/project/:orgOrUser/:project`**: project page for `orgOrUser/project`
- **`/api/get-github-token`**: backend endpoint to fetch the GitHub token using the Clerk user id.
