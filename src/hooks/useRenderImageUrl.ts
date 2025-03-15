export const renderImageUrl = (url: string) => {
  if (url.includes("uploads/")) {
    return process.env.NEXT_PUBLIC_BASE_URL + url;
  }
  return url;
};
