/** Builds the social-card URL for a page. Relative, resolved against metadataBase. */
export function ogImage({
  eyebrow,
  title,
  meta,
}: {
  eyebrow?: string;
  title?: string;
  meta?: string;
}) {
  const params = new URLSearchParams();
  if (eyebrow) params.set("eyebrow", eyebrow);
  if (title) params.set("title", title);
  if (meta) params.set("meta", meta);

  const query = params.toString();
  return {
    url: query ? `/api/og?${query}` : "/api/og",
    width: 1200,
    height: 630,
    alt: title ?? "Muhammad Ali Ahson — AI Systems & Backend Engineer",
  };
}
