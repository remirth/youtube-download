export const writeFile = (
  videoId: string,
  format: string
): Promise<Response> => {
  const searchParams = new URLSearchParams({format});
  return fetch(`/api/${videoId}?${searchParams.toString()}`, {
    method: 'POST',
  });
};

export const readFile = async (
  videoId: string | undefined,
  format: string
): Promise<Blob> => {
  if (!videoId) throw new Error('No videoId provided');
  const params = new URLSearchParams({
    format,
  });

  const result = await fetch(`/api/${videoId}?${params.toString()}`);
  if (result.status !== 200) {
    throw new Error(`Error: ${result.status}: ${result.statusText}`);
  }

  return result.blob();
};
