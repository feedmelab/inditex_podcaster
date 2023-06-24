import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import PodcastList from "./PodcastList";
import store from "../../store/store";
import Header from "../Header/Header";

describe("PodcastList", () => {
  it("should display only the filtered podcasts based on the input value", () => {
    render(
      <Provider store={store}>
        <Header />
        <PodcastList />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Podcast 2" } });

    const filteredPodcasts = screen
      .getAllByTestId("podcast-item")
      .map((podcast) => podcast.textContent);

    console.log(filteredPodcasts);

    expect(filteredPodcasts).toEqual(["Podcast 2"]);
  });

  it("should have an image, name, and link for each podcast after data loading", () => {
    render(
      <Provider store={store}>
        <PodcastList />
      </Provider>
    );

    const podcastItems = screen.getAllByTestId("podcast-item");

    podcastItems.forEach((podcast) => {
      expect(podcast).toContainElement(screen.getByRole("img"));
      expect(podcast).toContainElement(screen.getByRole("heading"));
      expect(podcast).toContainElement(screen.getByRole("link"));
    });
  });
});
