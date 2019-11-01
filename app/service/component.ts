import { Service } from 'egg';
import * as mongoose from 'mongoose';

interface ComponentPayload {
  name: string;
  title: string;
  version: string;
  creator: string;
}

export default class ComponentService extends Service {
  public async list(): Promise<any[]> {
    const results = await this.ctx.model.Component.find({
      isDeleted: false,
    });

    return results;
  }

  public async create(paylod: ComponentPayload) {
    const params = {
      creator: 'admin',
      ...paylod,
    };

    const result = await this.ctx.model.Component.create(params);
    return result;
  }

  public async update(id: mongoose.Types.ObjectId, payload: ComponentPayload) {
    return await this.ctx.model.Component.update({ _id: id }, payload);
  }

  public async delete(id: mongoose.Types.ObjectId) {
    await this.ctx.model.Component.updateOne({ _id: id }, {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: 'admin',
    });
  }
}
