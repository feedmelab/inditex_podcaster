import React from "react";
import { render, screen } from "@testing-library/react";

import App from "../../App";
import { Provider } from "react-redux";
import store from "./store/store";

describe("PRUEBAS DE COMPONENTES", () => {
  test("Existe un titulo", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const tituloEpisodio = screen.queryAllByTestId("episode-title");
    expect(tituloEpisodio.length).toBeGreaterThan(0);
  });
  test("Existe una descripcion", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const descripcionEpisodio = screen.queryAllByTestId("episode-description");
    expect(descripcionEpisodio.length).toBeGreaterThan(0);
  });
  test("Existe una url", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const urlEpisodio = screen.queryAllByTestId("episode-url");
    expect(urlEpisodio.length).toBeGreaterThan(0);
  });
  test("ESe ejecuta un audio", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
});

describe("PRUEBAS DE FUNCIONALIDAD", () => {
  test("Hay un link para volver al podcast episode list", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const testElm = screen.getByTestId("titulo-podcast");
    expect(testElm).toBeInTheDocument();
    expect(testElm.getAttribute("href")).toBe("/podcast/");
  });
});

describe("PRUEBAS DE CARGA", () => {});
