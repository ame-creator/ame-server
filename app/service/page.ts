import { Service } from 'egg';
import * as mongoose from 'mongoose';
import * as lodash from 'lodash';

const ObjectId = mongoose.Types.ObjectId;

interface CreatePayload {
  projectId: string;
  title: string;
  path: string;
}

interface AddComponentPayload {
  pageId: string;
  addComponents: any[];
}

interface ChangeComponentDataPayload {
  pageId: string;
  componentListId: string;
  options: object;
}

export default class PageService extends Service {
  public async find(pageId: string) {
    const results = await this.ctx.model.Page.aggregate([
      {
        $match: { _id: ObjectId(pageId), isDeleted: false },
      },
      {
        $lookup: {
          from: 'components',
          localField: 'componentList.componentId',
          foreignField: '_id',
          as: 'componentDetails',
        },
      },
    ]);

    const result = results.length > 0 ? results[0] : {};
    if (result && result.componentDetails) {
      result.componentDetails = lodash.keyBy(result.componentDetails, '_id');
    }

    result.componentList = lodash.sortBy(result.componentList, [ 'order' ]);

    return result;
  }

  public async create(payload: CreatePayload) {
    const params = {
      creator: 'admin',
      ...payload,
    };

    const result = await this.ctx.model.Page.create(params);
    return result;
  }

  public async addComponents(payload: AddComponentPayload) {
    const { addComponents, pageId } = payload;

    // 更新组件版本
    const addComponentsMap = {};
    addComponents.forEach(item => {
      addComponentsMap[`componentMap.${item.componentId}`] = {
        version: item.version,
      };
    });

    const result = await this.ctx.model.Page.updateOne(
      { _id: pageId },
      {
        $push: { componentList: { $each: addComponents } },
        ...addComponentsMap,
      },
      {
        upsert: true,
      },
    );

    return result;
  }

  public async changeComponentData(payload: ChangeComponentDataPayload) {
    const { componentListId, options, pageId } = payload;

    const result = await this.ctx.model.Page.updateOne(
      {
        _id: pageId,
        'componentList._id': componentListId,
      },
      {
        'componentList.$.options': options,
      },
    );

    return result;
  }
}
