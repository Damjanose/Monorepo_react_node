const trimSlash = (s: string) => s.replace(/\/$/, "")

// NEXT_PUBLIC_* vars are inlined at build time, so they must be referenced literally.
export const getEnv = () => ({
  apiUrl: trimSlash(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"),
  socketUrl: trimSlash(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3001"),
})
