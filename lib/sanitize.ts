import DOMPurify from "isomorphic-dompurify";

/**
 * Strip XSS vectors from HTML string before saving to the database.
 * Allows safe formatting tags but removes <script>, event handlers, etc.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "blockquote", "pre", "code",
      "a", "img", "hr",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
    FORBID_SCRIPTS: true,
    FORBID_TAGS: ["style", "iframe", "form", "input"],
  });
}
