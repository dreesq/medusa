const {utils} = require('@dreesq/serpent');

utils.autoCrud('User', {
    middleware: [
        'auth',
    ],
    before(ctx, method, filters) {
        if (method === 'find') {
            return query => {
                query.populate('role');
            }
        }
    }
});