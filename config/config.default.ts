import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554299035066_6410';

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    credentials: true,
  };

  // add your egg config in here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://mongo:27087/ame',
      options: {
        useCreateIndex: true,
        user: 'ame',
        pass: 'ame2020',
      },
    },
  };

  // add your special config in here
  const bizConfig = {
    routerPrefix: '/',
    ame: {
      componentsRoot: path.join(__dirname, '../../ame-components-dist'),
      templateRoot: path.join(__dirname, '../../ame-templates/vue-vuetify-mobile'),
      distRoot: '/data/ame-dist',
      previewUrlPrefix: 'http://localhost:8081/',
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
