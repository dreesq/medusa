const {utils} = require('@dreesq/serpent');

utils.autoCrud('Role', {
    middleware: [
        'auth',
    ],
    before({input}, method, filters) {
        if (method === 'find') {
            return query => {
                if (input.filters.search) {
                    query.where('name', new RegExp(input.filters.search, 'i'));
                }
            };
        }

        return filters;
    }
});