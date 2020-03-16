import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.security = {
    domainWhiteList: [
      'http://localhost:8080',
    ],
  };

  return config;
};
