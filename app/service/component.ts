import { Service } from 'egg';

export default class ComponentService extends Service {
  public async list(): Promise<any[]> {
    const results = await this.ctx.model.Component.find({
      isDeleted: false,
    });

    return results;
  }
}
