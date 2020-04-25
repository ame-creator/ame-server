import { Document } from 'mongoose'

export interface Component extends Document {
  readonly name: string;
  readonly title: string;
  readonly description: string;
}
