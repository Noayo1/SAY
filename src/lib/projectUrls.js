// Keep links safe even when older Sanity slugs contain spaces or URL escapes.
export function normalizeProjectSlug(slug = "") {
  let value = slug || "";
  try {
    value = decodeURIComponent(value);
  } catch {
    // A literal or malformed percent escape is still a valid value to compare.
  }
  return value.trim().replace(/\s+/g, "-");
}

export function projectHref(slug) {
  return "/projects/" + encodeURIComponent(normalizeProjectSlug(slug));
}
