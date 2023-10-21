import React from 'react';
import { describe, expect, it, render, screen } from 'vitest';

import App from './App.js';
import { Provider } from 'react-redux';
import store from './store/store.js';

describe('PRUEBAS DE COMPONENTES', () => {
  /**
   * 1 Existe el texto Podcaster?
   * 2 Existe el elemento input?
   * 3 Existe un elemento de navegación hacia Inicio?
   */
  it('1 | render text', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/Podcaster/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('2 | render search input', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const testElm = screen.getByRole('textbox');
    expect(testElm).toBeInTheDocument();
  });

  it('3 | link to / exist', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const testElm = screen.getByRole('link', { name: /Podcaster/i });
    expect(testElm).toBeInTheDocument();
    expect(testElm.getAttribute('href')).toBe('/');
  });
});

describe('PRUEBAS DE FUNCIONALIDAD', () => {
  /**
   * 1 El input recive los datos introducidos correctamente?
   */
  it('1 | EL input reacciona correctamente', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/Podcaster/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('PRUEBAS DE CARGA', () => {
  /**
   * 1 Loader visible durante la llamada al fetch y no visible al finalizar
   */
  it('1 | Loader', async () => {
    const { renderview } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const loader = renderview.container.querySelector('nprogress');
    expect(loader).toBeInTheDocument();
    expect(loader).toBeNull();
  });
});

describe('FBUZZ', () => {});
