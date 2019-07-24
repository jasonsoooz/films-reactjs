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
* Add back end
* Add validation on mandatory fields (title, release date)
* Add update functionality
