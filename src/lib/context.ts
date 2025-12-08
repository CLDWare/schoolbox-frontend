import { createContext } from "svelte";

export const [getAuthContext, setAuthContext] = createContext<
  { auth: string }
>();
