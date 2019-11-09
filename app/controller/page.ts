import { Controller } from 'egg';

export default class PageController extends Controller {
  private createRule = {
    title: 'string',
    projectId: 'string',
  };

  private addComponentsRule = {
    pageId: 'string',
    addComponents: 'array',
  };

  private changeComponentDataRule = {
    pageId: 'string',
    componentListId: 'string',
    options: 'object',
  };

  public async find() {
    const { ctx, service } = this;
    const { id } = ctx.params;

    const result = await service.page.find(id);

    ctx.helper.success(ctx, result);
  }

  public async create() {
    const { ctx, service } = this;
    ctx.validate(this.createRule);

    const result = await service.page.create(ctx.request.body);
    ctx.helper.success(ctx, result);
  }

  public async addComponents() {
    const { ctx, service } = this;
    ctx.validate(this.addComponentsRule);

    const result = await service.page.addComponents(ctx.request.body);
    ctx.helper.success(ctx, result);
  }

  public async changeComponentData() {
    const { ctx, service } = this;
    ctx.validate(this.changeComponentDataRule);

    const result = await service.page.changeComponentData(ctx.request.body);
    ctx.helper.success(ctx, result);
  }
}
