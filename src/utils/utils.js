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

export const applyFilter = (podcasts, filterValue) => {
  const normalizedFilter = filterValue.toLowerCase();
  return podcasts.filter((podcast) => {
    const name = podcast["im:name"].label.toLowerCase();
    const artist = podcast["im:artist"].label.toLowerCase();
    return name.includes(normalizedFilter) || artist.includes(normalizedFilter);
  });
};
