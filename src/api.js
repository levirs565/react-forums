const rootUrl = "https://forum-api.dicoding.dev/v1";
const accessTokenKey = "accessToken";

async function customFetch(path, { headers, ...moreOptions }) {
  const accessToken = localStorage.getItem(accessTokenKey);
  const response = await fetch(`${rootUrl}/${path}`, {
    ...moreOptions,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      ...headers,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    const error = new Error(json.message);
    error.statusCode = response.status;
    throw error;
  }
  return json.data;
}

export function getData(path) {
  return customFetch(path, {});
}

export function postData(path, data) {
  return customFetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function setToken(token) {
  localStorage.setItem(accessTokenKey, token);
}
