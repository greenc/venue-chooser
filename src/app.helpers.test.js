import {
    intersection,
    difference,
    sanitize,
    mapUserPrefsToVenues,
    getSuggestions
} from './app.helpers';

const mockVenues = [{
    name: 'Venue 1',
    food: ['Food 1'],
    drinks: ['Drink 1', 'Drink 2', 'Drink 3']
}, {
    name: 'Venue 2',
    food: ['Food 1', 'Food 2'],
    drinks: ['Drink 1', 'Drink 3']
}];

const mockUsers = [{
    name: 'User 1',
    wont_eat: ['Food 1'],
    drinks: ['Drink 1', 'Drink 2', 'Drink 3']
}, {
    name: 'User 2',
    wont_eat: [],
    drinks: ['Drink 2']
}];

describe('intersection', () => {
    it('returns elements that exist in both of 2 input arrays', () => {
        expect(intersection([1, 2, 3, 4, 5], [1, 3, 5])).toEqual([1, 3, 5]);
    });
});

describe('difference', () => {
    it('returns elements that do not exist in both of 2 input arrays', () => {
        expect(difference([1, 2, 3, 4, 5], [1, 3, 5])).toEqual([2, 4]);
    });
});

describe('sanitize', () => {
    it('converts each string in an array to lovercase and trims it', () => {
        expect(sanitize([' a Test', 'STRING'])).toEqual(['a test', 'string']);
    });
});

describe('mapUserPrefsToVenues', () => {
    it('Adds arrays of users who can eat and drink at each venue to each venue item', () => {
        const mappedVenues = mapUserPrefsToVenues(mockVenues, mockUsers);
        // Venue 1
        expect(mappedVenues[0].canEatHere).toEqual(['User 2']);
        expect(mappedVenues[0].canDrinkHere).toEqual(['User 1', 'User 2']);
        // Venue 2
        expect(mappedVenues[1].canEatHere).toEqual(['User 1', 'User 2']);
        expect(mappedVenues[1].canDrinkHere).toEqual(['User 1']);
    });
});

describe('getSuggestions', () => {
    it('Returns correct suggestions for a set of users', () => {
        const mappedVenues = [{
            name: 'Venue 1',
            food: ['Food 1'],
            drinks: ['Drink 1', 'Drink 2', 'Drink 3'],
            canEatHere: ['User 2'],
            canDrinkHere: ['User 1', 'User 2']
        }, {
            name: 'Venue 2',
            food: ['Food 1', 'Food 2'],
            drinks: ['Drink 1', 'Drink 3'],
            canEatHere: ['User 1', 'User 2'],
            canDrinkHere: ['User 1']
        }];
        const suggestions = getSuggestions(mappedVenues, ['User 1', 'User 2']);
        expect(suggestions.suitable).toEqual([]);
        expect(suggestions.unsuitable).toEqual([{
                name: 'Venue 1',
                problems: ['There is nothing for User 1 to eat']
            },
            {
                name: 'Venue 2',
                problems: ['There is nothing for User 2 to drink']
            }
        ]);
    });
});
