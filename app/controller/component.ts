import { Controller } from 'egg';

export default class ComponentController extends Controller {
  public async list() {
    const { ctx, service } = this;
    const result = await service.component.list();

    ctx.helper.success(ctx, result);
    // this.ctx.body = result;
    // this.ctx.status = 200;
  }
}
