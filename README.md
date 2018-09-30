# Venue Chooser App

This app is built with [create-react-app](https://github.com/facebook/create-react-app).

### Additional dependencies
None

### Setup
`npm install` or `yarn`

### Preview
`npm start` or `yarn start`

### Build
`npm run build` or `yarn build`

### Test
`npm test` or `yarn test`


## Notes
This was a really fun challenge to take on. A good percentage of the time taken was trying to come up with a data structure that would simplify filtering of the venues against the selected users. The end result strikes a balance by mapping each user's food and drink preferences to each venue on start up. This somewhat reduces complexity when filtering based on the selected attendees.

With more time, I would have liked to explore an even more efficient way to structure the data, and write much more comprehensive tests (currently there's not really any edge case testing).

- In the spirit of KISS, there's no Redux, immutable implementations or other state management, all of which seemed like overkill for the scope of this test
- The app is styled with a basic global stylesheet
- Only the main logic has unit tests, not the components themselves due to time constraints