const {utils, config, Constants} = require('@dreesq/serpent');
const {USER_STATUS_MAP, USER_STATUS_ACTIVE} = Constants;
const bcrypt = require('bcryptjs');

const userSchema = async method => utils.form({
    name: {
        label: 'Name *',
        placeholder: 'Name',
        validation: 'required|string|min:5',
        size: '7'
    },
    locale: {
        label: 'Locale',
        type: 'select',
        validation: 'required|string|min:2',
        values: [
            {
                name: 'EN',
                value: 'en'
            }

        ],
        value: 'en',
        size: '3'
    },
    email: {
        label: 'Email',
        placeholder: 'Email',
        type: 'email',
        validation: 'email|min:5|unique:user,email',
        ifChanged: true
    },
    password: {
        label: 'Password *',
        placeholder: 'Password',
        type: 'password',
        validation: 'string|min:5',
        ifChanged: true
    },
    role: {
        label: 'Role',
        type: 'autocomplete',
        values: 'roleAutocomplete',
        size: '5'
    },
    status: {
        label: 'Status',
        type: 'select',
        values: Object.keys(USER_STATUS_MAP).map(key => ({
            name: USER_STATUS_MAP[key],
            value: key
        })),
        value: 1,
        size: '5'
    }
});

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
    schema: userSchema,
    async before({input}, method, filters) {
        if (!input.role) {
            delete input.role;
        }

        if (method === 'find') {
            return query => {
                query.populate('role').populate('permissions');
            }
        }

        if (method === 'update' || method === 'create') {
            input.password = await bcrypt.hash(input.password, 10);
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


config({
    name: 'roleAutocomplete',
    input: {
        text: 'required|string'
    },
    middleware: [
        'auth:required'
    ]
})(
    async ({db, input}) => {
        const {Role} = db;
        return await Role.find().where('name', new RegExp(input.text, 'i'));
    }
);


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
                if (filters.search) {
                    query.where('name', new RegExp(filters.search, 'i'));
                }
            };
        }

        return filters;
    }
});
