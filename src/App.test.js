import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

describe("PRUEBAS DE COMPONENTES", () => {
  /**
   * 1 Existe el texto Podcaster?
   * 2 Existe el elemento input?
   * 3 Existe un elemento de navegación hacia Inicio?
   */
  test("1 | render text", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/Podcaster/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("2 | render search input", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const testElm = screen.getByRole("textbox");
    expect(testElm).toBeInTheDocument();
  });

  test("3 | link to / exist", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const testElm = screen.getByRole("link", { name: /Podcaster/i });
    expect(testElm).toBeInTheDocument();
    expect(testElm.getAttribute("href")).toBe("/");
  });
});

describe("PRUEBAS DE FUNCIONALIDAD", () => {
  /**
   * 1 El input recive los datos introducidos correctamente?
   */
  test("1 | EL input reacciona correctamente", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/Podcaster/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("PRUEBAS DE CARGA", () => {
  /**
   * 1 Loader visible durante la llamada al fetch y no visible al finalizar
   */

  test("1 | Loader", async () => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              json: () =>
                Promise.resolve({
                  feed: {
                    entry: [
                      {
                        "im:name": { label: "Miss Indepodcast" },
                      },
                    ],
                  },
                }),
            });
          }, 500);
        })
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).toBeNull();
    });
  });
});
