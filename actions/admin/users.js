const {utils} = require('@dreesq/serpent');
const {USER_STATUS_MAP, USER_STATUS_ACTIVE} = require('@dreesq/serpent/constants');

utils.autoCrud('User', {
    middleware: [
        'auth:required',
    ],
    fields: [
        'role',
        '_id',
        'name',
        'status',
        'locale',
        'email',
        'permissions'
    ],
    schema: utils.form({
        name: {
            label: 'Name *',
            placeholder: 'Name',
            name: 'name',
            type: 'text',
            validation: 'required|string|min:5'
        },
        email: {
            label: 'Email',
            placeholder: 'Email',
            type: 'email',
            validation: 'email|min:5'
        },
        password: {
            label: 'Password *',
            placeholder: 'Password',
            type: 'password',
            validation: 'required|string|min:5'
        },
        role: {
            label: 'Role',
            type: 'select',
            name: 'role',
            values: []
        },
        status: {
            label: 'Status',
            type: 'select',
            name: 'status',
            values: Object.keys(USER_STATUS_MAP).map(key => ({
                name: USER_STATUS_MAP[key],
                value: key
            }))
        }
    }),
    before(ctx, method, filters) {
        if (method === 'find') {
            return query => {
                query.populate('role').populate('permissions');
            }
        }
    },
    async after(ctx, method, result) {
        if (method === 'find') {
            result.data = result.data.map(item => {
                item = item.toJSON();
                item.status = USER_STATUS_MAP[item.status];
                item.permissions = ['A', 'B', 'C'];
                return item;
            });
        }

        return result;
    }
});

utils.autoCrud('Role', {
    middleware: [
        'auth:required',
    ],
    schema: utils.form({
        name: {
            label: 'Name',
            placeholder: 'Name',
            name: 'name',
            validation: 'required|string|min:3'
        }
    }),
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
