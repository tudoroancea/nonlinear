import { createClerkClient } from "@clerk/backend";
import type { Config, Context } from "@netlify/functions";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const config: Config = {
  path: "/api/get-github-token",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(req: Request, context: Context) {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
    });
  }

  const userId = new URL(req.url).searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId parameter" }), {
      status: 400,
    });
  }

  try {
    const response = await clerkClient.users.getUserOauthAccessToken(
      userId as string,
      "github",
    );
    const githubToken = response.data[0].token;

    if (githubToken) {
      return new Response(JSON.stringify({ githubToken }), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "No GitHub identity found for this user" }),
        {
          status: 404,
        },
      );
    }
  } catch (error) {
    console.error("Error fetching GitHub token:", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve GitHub token" }),
      {
        status: 500,
      },
    );
  }
}
