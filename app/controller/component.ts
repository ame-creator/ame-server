import { Controller } from 'egg';

export default class ComponentController extends Controller {
  private createRule = {
    name: 'string',
    title: 'string',
    version: 'string',
  };

  private getSchemaRule = {
    name: 'string',
    version: 'string',
  };

  public async list() {
    const { ctx, service } = this;
    const result = await service.component.list();

    ctx.helper.success(ctx, result);
  }

  public async create() {
    const { ctx, service } = this;
    ctx.validate(this.createRule);

    const result = await service.component.create(ctx.request.body);
    ctx.helper.success(ctx, result);
  }

  public async getSchema() {
    const { ctx, service } = this;
    ctx.validate(this.getSchemaRule, ctx.request.query);

    const { name, ...params } = ctx.request.query;

    const result = await service.component.getSchema({
      name,
      ...params,
    });
    if (!result) {
      ctx.helper.error(ctx, 400, '未知组件！');
      return;
    }

    ctx.helper.success(ctx, result);
  }
}
