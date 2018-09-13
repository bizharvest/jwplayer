import Promise, { resolved } from 'polyfills/promise';
import { PlayerError, MSG_PLUGIN_LOAD_FAILED } from 'api/errors';
import { configurePlugin, mapPluginToCode } from 'plugins/utils';

const PluginLoader = function () {
    this.load = function (api, pluginsModel, pluginsConfig, model) {
        // Must be a hash map
        if (!pluginsConfig || typeof pluginsConfig !== 'object') {
            return resolved;
        }

        return Promise.all(Object.keys(pluginsConfig).filter(pluginUrl => pluginUrl)
            .map(pluginUrl => {
                const pluginConfig = pluginsConfig[pluginUrl];
                return pluginsModel.setupPlugin(pluginUrl).then((plugin) => {
                    if (model.attributes._destroyed) {
                        return;
                    }
                    return configurePlugin(plugin, pluginConfig, api);
                }).catch(error => {
                    pluginsModel.removePlugin(pluginUrl);
                    return new PlayerError(MSG_PLUGIN_LOAD_FAILED, mapPluginToCode(pluginUrl), error);
                });
            }));
    };

};

export default PluginLoader;
