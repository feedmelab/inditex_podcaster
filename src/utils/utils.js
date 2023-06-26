export const formatDescription = (description) => {
  const urlRegex = /(\b\w+\.\w+\/\b\w*|https:\/\/[^\s]+)/gi;
  return description.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
};
