import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  timestamps: true
})
export class Component extends Document {
  @Prop({
    required: true,
    unique: true
  })
  name: string

  @Prop({
    required: true
  })
  title: string

  @Prop()
  type: string

  @Prop()
  version: string

  @Prop()
  description: string

  @Prop()
  creator: string

  @Prop({
    default: false,
  })
  isDeleted: boolean

  @Prop()
  deletedAt: Date

  @Prop()
  deletedBy: string
}

export const ComponentSchema = SchemaFactory.createForClass(Component)
