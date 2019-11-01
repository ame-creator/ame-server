import { Context } from 'egg';

export default {
  success(ctx: Context, data: any) {
    ctx.body = data;
    ctx.status = 200;
  },
};
