import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,

  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

export default plugin;
