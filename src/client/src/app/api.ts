const baseUrl = 'https://cherryservice.azurewebsites.net';

export const rephrase = async (text: string) => {
  return await fetch(`${baseUrl}/rephrase`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ text })
  });
};
