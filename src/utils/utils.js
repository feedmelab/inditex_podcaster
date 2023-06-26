export const formatDescription = (description) => {
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;
  return description.replace(urlRegex, (url) => {
    if (url.startsWith("http")) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    } else {
      return `<a href="https://${url}" target="_blank">${url}</a>`;
    }
  });
};
