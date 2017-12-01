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

// an enumerated type: ActionType can only equal one of these strings
// (since we just have the one type currently, we've set it equal to just the one string)
declare type ActionType = 'SET_SEARCH_TERM';

// the |'s here are needed when using generic types
declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

// For multiple ActionTypes we set Action = ActionT<...> | ActionT<...>
// that is a different ActionT for each ActionType we want to export
export type Action = ActionT<'SET_SEARCH_TERM', string>;
