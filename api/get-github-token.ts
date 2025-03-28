import { ManagementClient } from "auth0";
import { VercelRequest, VercelResponse } from "@vercel/node";

const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId } = req.query; // Get the user ID from the request

  if (!userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }

  try {
    const user = await auth0.users.get({ id: userId as string });
    const githubIdentity = user.identities?.find(
      (id) => id.provider === "github",
    );

    if (githubIdentity) {
      const githubToken = githubIdentity.access_token;
      return res.status(200).json({ githubToken });
    } else {
      return res
        .status(404)
        .json({ error: "No GitHub identity found for this user" });
    }
  } catch (error) {
    console.error("Error fetching GitHub token:", error);
    return res.status(500).json({ error: "Failed to retrieve GitHub token" });
  }
}
