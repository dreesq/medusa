const {autoCrud} = require('@dreesq/serpent');

autoCrud('User', {
    middleware: [
        'auth',
        'is:admin'
    ]
});