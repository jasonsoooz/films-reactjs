# films-reactjs

Example web application that displays list of films.

## Prerequisites
* Node >= v10
* npm >= v5
* Reactjs >= v16

To run the app:
```
# Only required first time: install node dependencies
npm install

# To run the app
npm run server
npm start

# To access the app
http://localhost:3000

# To run tests:
# 1. With server watcher: start on 1st command line console, as some
#    tests depend on the server (eg client tests calling back end)
npm run server
# 2. With test watcher: run tests on 2nd command line console
npm test
```

## ToDo
* run server / client
* fix test warnings
* Add back end
* Add validation on mandatory fields (title, release date)
* Add update functionality

```
Warning: An update to FilmList inside a test was not wrapped in act(...).
      
      When testing, code that causes React state updates should be wrapped into act(...):
      
      act(() => {
        /* fire events that update state */
      });
      /* assert on the output */
      
      This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
          in FilmList (at FilmList.selector.js:9)

```