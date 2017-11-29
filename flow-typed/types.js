// @flow

// declaring this for use in ClientApp:
// module.hot.accept('/App', () => {renderApp()})
declare var module: {
  hot: {
    // the method accept takes two parameters - path, a string - and callback, a cb
    // function that returns void. accept itself returns void
    accept(path: string, callback: () => void): void
  }
};
