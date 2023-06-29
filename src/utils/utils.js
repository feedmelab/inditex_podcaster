import axios from "axios";
import { updateDownloadProgress } from "../features/podcast/podcastSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchPodcastDetails = createAsyncThunk(
  "podcast/fetchPodcastDetails",
  async (podcastId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
        )}`,
        {
          responseType: "json",
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded / 20000) * 100
            );
            dispatch(updateDownloadProgress(percentCompleted));
          },
        }
      );

      if (!response.data || !response.data.contents) {
        throw new Error("Server response was not as expected.");
      }

      const parsedData = await JSON.parse(response.data.contents);
      dispatch(updateDownloadProgress(0));
      return parsedData.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPodcasts = createAsyncThunk(
  "podcast/fetchPodcasts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        )}`,
        {
          responseType: "json",
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            dispatch(updateDownloadProgress(percentCompleted));
          },
        }
      );

      if (!response.data) {
        throw new Error("Server response was not as expected.");
      }

      const parsedData = JSON.parse(response.data.contents);

      const podcasts = parsedData.feed.entry.map((entry) => ({
        id: entry.id.attributes["im:id"],
        summary: entry.summary?.label || "",
        "im:name": { label: entry["im:name"].label },
        "im:artist": { label: entry["im:artist"].label },
        "im:image": entry["im:image"].map((image) => ({
          label: image.label,
          attributes: { height: image.attributes.height },
        })),
      }));

      return podcasts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
