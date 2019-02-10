const {config, utils} = require('@dreesq/serpent');

config({
    name: 'getItems',
    input: {
        filters: 'object'
    },
    middleware: [
        'auth'
    ]
})(
    utils.autoFilter('Item', {
        restrictToUser: true
    })
);

config({
    name: 'createItem',
    input: {
        name: 'required|string|min:24',
        description: 'required|string|between:20,120',
        picture: 'file',
        price: 'number'
    },
    middleware: [
        'auth',
        'upload:./storage/uploads'
    ]
})(
    async ({db, input, user}) => {
        return db.Item.create({
            ...input,
            userId: user._id
        });
    }
);