# nonlinear

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

-
