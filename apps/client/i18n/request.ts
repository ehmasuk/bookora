import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // check is there any language on cookie
  const cookieStore = await cookies();
  const language = cookieStore.get("LANGUAGE")?.value;

  // if cookie is there set local as cookie or set local as default (en)
  const locale = language || "en";

  return {
    locale,
    messages: (await import(`../translations/${locale}.json`)).default,
  };
});
