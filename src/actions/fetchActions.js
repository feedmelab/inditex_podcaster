import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadAxiosProgress } from "axios-progress";

loadAxiosProgress(axios);

export const fetchPodcastDetails = createAsyncThunk(
  "podcast/fetchPodcastDetails",
  async (podcastId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
        )}`
      );

      if (!response.data || !response.data.contents) {
        throw new Error("Server response was not as expected.");
      }

      const parsedData = await JSON.parse(response.data.contents);

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
        )}`
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
