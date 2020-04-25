import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ComponentType {
  @Field()
  readonly name: string

  @Field()
  readonly title: string

  @Field()
  readonly description: string
}
