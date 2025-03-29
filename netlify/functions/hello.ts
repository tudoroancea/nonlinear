import type { Context, Config } from "@netlify/functions";

export const config: Config = {
  path: "/api/hello",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (req: Request, context: Context) => {
  return new Response("Hello, world!");
};
