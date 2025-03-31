import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://docs.github.com/public/fpt/schema.docs.graphql",
  documents: ["src/queries/*.gql"], // Where your GraphQL operations are defined
  generates: {
    "./src/generated/": {
      preset: "client",
    },
  },
};

export default config;
