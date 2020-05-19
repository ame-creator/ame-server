import * as mongoose from 'mongoose'

export const ComponentSchema = new mongoose.Schema({
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
  deletedBy: {
    type: String,
    select: false,
  },
}, {
  timestamps: true,
})
