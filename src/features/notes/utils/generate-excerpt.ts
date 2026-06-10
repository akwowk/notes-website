export function generateExcerpt(
  content: string
) {
  return content
    .replace(/[#*_`]/g, "")
    .slice(0, 200);
}