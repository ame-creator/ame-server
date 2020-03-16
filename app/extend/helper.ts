import { Context } from 'egg';

export default {
  success(ctx: Context, data: any) {
    ctx.body = data;
    ctx.status = 200;
  },

  error(ctx: Context, status: number, error: string) {
    ctx.body = {
      error,
    };
    ctx.status = status || 500;

    ctx.logger.error('请求错误！', status, error, ctx.request.body, ctx.request.query);
  },
};
