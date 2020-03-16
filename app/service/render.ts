import { Service } from 'egg';
import * as mongoose from 'mongoose';
import * as lodash from 'lodash';
import * as path from 'path';

const ObjectId = mongoose.Types.ObjectId;

interface RenderPagePayload {
  pageId: string;
}

const getComponentName = name => {
  return lodash.upperFirst(lodash.camelCase(name));
};

export default class RenderService extends Service {
  public async renderPage(payload: RenderPagePayload) {
    const { model } = this.ctx;
    const { pageId } = payload;
    const { componentsRoot, templateRoot, distRoot, previewUrlPrefix } = this.config.ame;

    const renderId = mongoose.Types.ObjectId().toHexString();

    // 获取页面详情
    const results = await model.Page.aggregate([
      { $match: { _id: ObjectId(pageId), isDeleted: false } },
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
    if (!result) {
      return;
    }

    // componentList, componentDetails准备
    result.componentList = lodash.sortBy(result.componentList, [ 'order' ]);
    const componentDetails = lodash.keyBy(result.componentDetails, '_id');

    const { componentList, componentMap } = result;

    // 页面组件列表
    const components = componentList.map(item => {
      const componentId = item.componentId;
      const name = componentDetails[componentId].name;
      return {
        id: item._id,
        name,
        version: componentMap[componentId].version,
        componentName: getComponentName(name),
        options: item.options || {},
      };
    });

    const render = require(path.join(templateRoot, 'render', 'index.js'));

    await render({
      components,
      componentsPath: componentsRoot,
      destPath: path.join(distRoot, renderId),
      publicPath: `/${renderId}/`,
    });

    return {
      id: renderId,
      url: `${previewUrlPrefix}${renderId}/`,
    };
  }
}
