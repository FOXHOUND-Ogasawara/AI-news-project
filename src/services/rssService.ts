export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

export const fetchNews = async (query: string): Promise<NewsItem[]> => {
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
    query
  )}&hl=ja&gl=JP&ceid=JP:ja`;

  // Use the local proxy
  const proxyUrl = `/rss/search?q=${encodeURIComponent(
    query
  )}&hl=ja&gl=JP&ceid=JP:ja`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const items = xml.querySelectorAll("item");

    return Array.from(items).map((item) => ({
      title: item.querySelector("title")?.textContent || "",
      link: item.querySelector("link")?.textContent || "",
      pubDate: item.querySelector("pubDate")?.textContent || "",
      description:
        item
          .querySelector("description")
          ?.textContent?.replace(/<[^>]*>?/gm, "") || "", // Simple strip tags
      source: item.querySelector("source")?.textContent || "Google News",
    }));
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
};
