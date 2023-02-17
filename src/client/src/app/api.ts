const baseUrl = '';

export interface TextResponse {
  text: string
}

export const rephraseAsync = async (text: string): Promise<TextResponse> => {
  const response = await fetch(`${baseUrl}/rephrase`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ text })
  });
  return await response.json();
};

export const translateAsync = async (lang: string, text: string): Promise<TextResponse> => {
  const response = await fetch(`${baseUrl}/translate`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ lang, text })
  });
  return await response.json();
};
