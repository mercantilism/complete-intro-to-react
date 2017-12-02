// @flow

// moxios is the mocking library for axios
import moxios from 'moxios';
import { setSearchTerm, addAPIData, getAPIDetails } from '../actionCreators';

const westWorld = {
  rating: '6.0',
  title: 'Westworld',
  year: '2016–',
  description:
    'Set at the intersection of the near future and the reimagined past, explore a world in which every human appetite, no matter how noble or depraved, can be indulged without consequence.',
  poster: 'ww.jpg',
  imdbID: 'tt0475784',
  trailer: 'eX3u0IlBBO4'
};

test('setSearchTerm', () => {
  expect(setSearchTerm('New York')).toMatchSnapshot();
});

test('addAPIData', () => {
  expect(addAPIData(westWorld)).toMatchSnapshot();
});

// Note that the test for getAPIData uses addAPIData internally, and so is predicated on a good test for the addAPIData

// Done is here specific to jest and used for async tests, done will trigger the test completeion,
// otherwise the test will not complete until it has encounterd don
test('getAPIDetails', (done: Function) => {
  // this substitutes the mock version of axios instead of actually making a reuest
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    // getAPIDetails returns the thunk, a function normally then called by dispatch, here called by dispatchMock
    getAPIDetails(westWorld.imdbID)(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: westWorld
        })
        .then(() => {
          expect(request.url).toEqual(`http://localhost:3000/${westWorld.imdbID}`);
          expect(dispatchMock).toBeCalledWith(addAPIData(westWorld));
          done();
        });
    });
  });
});
