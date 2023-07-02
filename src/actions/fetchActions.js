import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadAxiosProgress } from "axios-progress";

loadAxiosProgress(axios);

const callAxios = async (url) => {
  const response = await axios.get(url);
  if (!response.data || !response.data.contents) {
    throw new Error("Server response was not as expected.");
  }
  return JSON.parse(response.data.contents);
};

export const fetchPodcastDetails = createAsyncThunk(
  "podcast/fetchPodcastDetails",
  async (podcastId, { rejectWithValue }) => {
    try {
      const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
      )}`;
      const parsedData = await callAxios(url);
      return parsedData.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPodcasts = createAsyncThunk(
  "podcast/fetchPodcasts",
  async (_, { rejectWithValue }) => {
    try {
      const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`;
      const parsedData = await callAxios(url);
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
