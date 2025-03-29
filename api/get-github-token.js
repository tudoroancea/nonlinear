import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId } = req.query; // Get the user ID from the request

  if (!userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }

  try {
    const response = await clerkClient.users.getUserOauthAccessToken(
      userId,
      "github",
    );
    console.log("response", response);
    const githubToken = response.data[0].token;

    if (githubToken) {
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
