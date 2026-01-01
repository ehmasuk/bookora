"use server";

import { cookies } from "next/headers";

const setCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
};

export default setCookie;
