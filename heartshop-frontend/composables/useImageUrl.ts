export function useImageUrl() {
  const getFullImageUrl = (imageUrl?: string | null): string => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http")) return imageUrl;
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
    if (imageUrl.startsWith("/uploads")) return `${baseUrl}/api${imageUrl}`;
    if (imageUrl.startsWith("/")) return `${baseUrl}${imageUrl}`;
    return `${baseUrl}/api/${imageUrl}`;
  };

  return { getFullImageUrl };
}
