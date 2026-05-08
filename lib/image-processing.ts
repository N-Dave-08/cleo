import { getAverageColor } from "fast-average-color-node";

export async function getImageDominantColor(imageUrl: string): Promise<string> {
  // If no image, return a default safe background (like light beige/transparent)
  if (!imageUrl) return "transparent";

  try {
    const color = await getAverageColor(imageUrl);
    return color.hex;
  } catch (error) {
    console.error("Error extracting color:", error);
    return "#fdfcf7"; // Return your site's default background color as fallback
  }
}
