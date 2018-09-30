const intersection = (arr1, arr2) => arr1.filter(x => arr2.includes(x));
const difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));
const sanitize = arr => arr.map(x => x.trim().toLowerCase());

const canEat = (food, wontEat) => {
    return !!difference(sanitize(food), sanitize(wontEat)).length;
};
const canDrink = (drinks, willDrink) => {
    return !!intersection(sanitize(drinks), sanitize(willDrink)).length;
}

const createFilter = (func, venue, venueKey, userKey) => user => {
    return func(venue[venueKey], user[userKey]);
}

const mapUserPrefsToVenues = (venues, users) => {
    return venues.map(venue => {
        const canEatFilter = createFilter(canEat, venue, 'food', 'wont_eat');
        const canDrinkFilter = createFilter(canDrink, venue, 'drinks', 'drinks');
        return {
            name: venue.name,
            canEatHere: users.filter(canEatFilter).map(user => user.name),
            canDrinkHere: users.filter(canDrinkFilter).map(user => user.name)
        };
    });
};

const getSuggestions = (venues, attendees) => {
    const suggestions = {
        suitable: [],
        unsuitable: []
    };

    venues.forEach(venue => {
        const problems = [];
        attendees.forEach(attendee => {
            if (!venue.canEatHere.includes(attendee)) {
                problems.push(`There is nothing for ${attendee} to eat`);
            }
            if (!venue.canDrinkHere.includes(attendee)) {
                problems.push(`There is nothing for ${attendee} to drink`);
            }
        });
        if (problems.length) {
            suggestions.unsuitable.push({
                name: venue.name,
                problems
            });
        } else {
            suggestions.suitable.push({
                name: venue.name
            });
        }
    });

    return suggestions;
};

export {
    intersection,
    difference,
    sanitize,
    mapUserPrefsToVenues,
    getSuggestions
}
