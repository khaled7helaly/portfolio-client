const API_URL = (
  import.meta.env.VITE_API_URL || ""
).replace(/\/$/, "");

/*
 * Fetch approved comments from the portfolio API.
 *
 * Expected response:
 * {
 *   comments: [
 *     {
 *       id: "...",
 *       username: "github-user",
 *       displayName: "GitHub User",
 *       avatarUrl: "https://avatars.githubusercontent.com/...",
 *       profileUrl: "https://github.com/github-user",
 *       message: "Great portfolio!",
 *       createdAt: "2026-10-20T10:00:00.000Z"
 *     }
 *   ]
 * }
 */

export async function getApprovedComments() {
  if (!API_URL) {
    return [];
  }

  const response = await fetch(
    `${API_URL}/api/comments?limit=8`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments.");
  }

  const data = await response.json();

  return Array.isArray(data.comments)
    ? data.comments
    : [];
}