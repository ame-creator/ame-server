import { Document } from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { ObjectID } from '@/generator/graphql.schema'

@Schema()
class Template extends Document {
  @Prop()
  id: ObjectID

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
  projectId: ObjectID

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
