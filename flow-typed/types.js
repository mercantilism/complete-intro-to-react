// @flow

// while we export this type, we don't actually need to import it
// in the files where it's used - it will automatically be made available.
export type Show = {
  title: string,
  description: string,
  year: string,
  imdbID: string,
  trailer: string,
  poster: string
};

// declaring this for use in ClientApp:
// module.hot.accept('/App', () => {renderApp()})
declare var module: {
  hot: {
    // the method accept takes two parameters - path, a string - and callback, a cb
    // function that returns void. accept itself returns void
    accept(path: string, callback: () => void): void
  }
};
