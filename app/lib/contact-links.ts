/** Link plain email addresses and phone numbers in rich HTML content. Existing links are preserved. */
export function linkifyContactHtml(html: string): string {
  if (!html) return html;

  let insideAnchor = false;
  let insideNonText = false;
  return html.replace(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g, (token) => {
    if (token.startsWith("<!--")) return token;
    if (token.startsWith("<")) {
      const opening = token.match(/^<\s*([a-z0-9]+)/i)?.[1]?.toLowerCase();
      const closing = token.match(/^<\s*\/\s*([a-z0-9]+)/i)?.[1]?.toLowerCase();
      if (opening === "a") insideAnchor = true;
      if (closing === "a") insideAnchor = false;
      if (opening === "script" || opening === "style") insideNonText = true;
      if (closing === "script" || closing === "style") insideNonText = false;
      return token;
    }
    if (insideAnchor || insideNonText) return token;

    return token.replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+?\d[\d\s().-]{7,}\d)/gi, (match) => {
      if (match.includes("@")) {
        const email = match.replace(/[),.;:!?]+$/, "");
        const trailing = match.slice(email.length);
        return "<a class=\"contact-link\" href=\"mailto:" + email + "\">" + email + "</a>" + trailing;
      }
      const digits = match.replace(/\D/g, "");
      if (digits.length < 10) return match;
      return "<a class=\"contact-link\" href=\"tel:+" + digits + "\">" + match + "</a>";
    });
  });
}
