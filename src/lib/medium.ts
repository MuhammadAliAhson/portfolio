import { site } from "./site";

export interface Post {
  title: string;
  href: string;
  published: string | null;
}

const ITEM = /<item>([\s\S]*?)<\/item>/g;

function field(block: string, tag: string): string | null {
  const match = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(block);
  if (!match) return null;
  return match[1]
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim();
}

/**
 * Pulls the latest posts from the Medium feed. Revalidated daily.
 * Any failure returns an empty list rather than breaking the build or the page —
 * callers fall back to a link out to the profile.
 */
export async function getPosts(limit = 3): Promise<Post[]> {
  try {
    const response = await fetch(site.mediumFeed, {
      next: { revalidate: 86400 },
      headers: { "user-agent": "portfolio-site" },
    });
    if (!response.ok) return [];

    const xml = await response.text();
    const posts: Post[] = [];

    ITEM.lastIndex = 0;
    let match = ITEM.exec(xml);
    while (match && posts.length < limit) {
      const block = match[1];
      const title = field(block, "title");
      const href = field(block, "link");
      if (title && href) {
        posts.push({ title, href, published: field(block, "pubDate") });
      }
      match = ITEM.exec(xml);
    }

    return posts;
  } catch {
    return [];
  }
}

export function formatPublished(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
