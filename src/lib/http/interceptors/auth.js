export function createAuthInterceptor(getToken) {
  return async function authInterceptor(headers) {
    const token = await getToken();
    if (!token) return headers;
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  };
}
