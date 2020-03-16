import { Controller } from 'egg';

export default class PageController extends Controller {
  private renderPageRule = {
    pageId: 'string',
  };

  public async renderPage() {
    const { ctx, service } = this;
    ctx.validate(this.renderPageRule);

    const result = await service.render.renderPage(ctx.request.body);
    ctx.helper.success(ctx, result);
  }
}
