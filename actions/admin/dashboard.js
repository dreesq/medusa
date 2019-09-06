const {config, plugin, Constants, utils} = require('@dreesq/serpent');

const {DRIVER_DB} = Constants;
const configPlugin = plugin('config');

config({
    name: 'getFeatures',
    middleware: [
        'auth:required'
    ]
})({
    logs: configPlugin.get('plugins.logger.driver') === DRIVER_DB,
    translations: configPlugin.get('plugins.i18n.driver') === DRIVER_DB
});

config({
    name: 'getLogs',
    middleware: [
        'auth:required'
    ],
    enabled: configPlugin.get('plugins.logger.driver') === DRIVER_DB
})(
    utils.autoFilter('Log')
);
