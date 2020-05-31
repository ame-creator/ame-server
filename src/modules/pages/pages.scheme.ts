import { Document } from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema()
class Template {
  @Prop()
  id: Types.ObjectId

  @Prop()
  version: string
}

@Schema({
  timestamps: true
})
export class Page extends Document {
  @Prop({
    required: true
  })
  projectId: Types.ObjectId

  @Prop()
  title: string

  @Prop()
  order: number

  @Prop()
  template: Template

  @Prop()
  snapshot: string

  @Prop()
  options: object

  @Prop()
  creator: string
}

export const PageSchema = SchemaFactory.createForClass(Page)
