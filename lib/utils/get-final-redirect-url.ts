export async function getFinalRedirectURL(url: string) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
    });

    if (
      response.status === 301 ||
      response.status === 302 ||
      response.status === 307 ||
      response.status === 308
    ) {
      const location = response.headers.get('location');

      if (!location) {
        throw new Error(
          `Redirect response is missing the "location" header: ${response.status}`,
        );
      }

      return getFinalRedirectURL(location);
    }

    if (!response.ok) {
      throw new Error(
        `Unexpected response when trying to get final redirect URL: ${response.status}`,
      );
    }

    return url;
  } catch (e) {
    console.error(e);
    throw new Error(`Error getting final redirect URL`);
  }
}
