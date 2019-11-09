import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const Schema = mongoose.Schema;
  const { ObjectId } = mongoose.Types;

  const ComponentSchema = new Schema({
    componentId: {
      type: ObjectId,
    },
    version: {
      type: String,
    },
    order: {
      type: Number,
    },
    options: {
      type: Object,
    },
  }, {
    minimize: false,
  });

  const PageSchema = new Schema({
    projectId: {
      type: ObjectId,
      required: true,
    },
    title: {
      type: String,
    },
    path: {
      type: String,
    },
    componentList: {
      type: [ ComponentSchema ],
    },
    componentMap: {
      type: Object,
      default: {},
    },
    creator: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    deletedAt: {
      type: Date,
      select: false,
    },
    deletedBy: {
      type: String,
      select: false,
    },
  }, {
    timestamps: true,
    minimize: false,
  });

  PageSchema.index({ projectId: 1, isDeleted: 1 });
  PageSchema.index({ projectId: 1, path: 1 }, { unique: true });

  return mongoose.model('Page', PageSchema);
};
