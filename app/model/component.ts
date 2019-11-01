import { Application } from 'egg';

export default (app: Application) => {
  const { mongoose } = app;
  const Schema = mongoose.Schema;

  const ComponentSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    version: {
      type: String,
    },
    description: {
      type: String,
    },
    creator: {
      type: String,
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
    deleteBy: {
      type: String,
      select: false,
    },
  }, {
    timestamps: true,
  });

  ComponentSchema.index({ type: 1, isDeleted: 1 });

  return mongoose.model('Component', ComponentSchema);
};
