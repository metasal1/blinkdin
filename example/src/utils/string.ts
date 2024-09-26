import { Language, checkLanguage, findLang } from "@bonfida/emojis";

/**
 * Checks if a subdomain name is valid
 * @param string Subdomain name
 * @returns boolean indicating if subdomain is valid
 */
export const isValidSubdomain = (subdomain: string) => {
  if (subdomain.includes(".")) {
    return false;
  }

  const lang = findLang(subdomain);
  if (lang === Language.Unauthorized) {
    return false;
  }

  return checkLanguage(subdomain, lang);
};

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}
