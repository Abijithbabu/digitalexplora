export const checkUrl = (url) => {
  if (!url) return null;
  return url.match(/\.(jpeg|jpg|gif|png|JPG)$/) != null;
};
