import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class ComponentInput {
  @Field()
  readonly name: string

  @Field()
  readonly title: string

  @Field()
  readonly description: string
}
