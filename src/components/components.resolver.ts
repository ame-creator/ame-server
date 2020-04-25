import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ComponentsService } from './components.service'
import { ComponentType } from './dto/create-component.dto'
import { ComponentInput } from './input-components.input'

@Resolver()
export class ComponentsResolver {
  constructor(private readonly componentsService: ComponentsService) {}

  @Query(() => [ComponentType])
  async components(): Promise<ComponentType[]> {
    return this.componentsService.findAll()
  }

  @Mutation(() => ComponentType)
  async createComponent(@Args('input') input: ComponentInput): Promise<ComponentInput> {
    return this.componentsService.create(input)
  }

  @Mutation(() => ComponentType)
  async updateComponent(
    @Args('id') id: string,
    @Args('input') input: ComponentInput
  ): Promise<ComponentInput> {
    return this.componentsService.update(id, input)
  }

  @Mutation(() => ComponentType)
  async deleteComponent(@Args('id') id: string): Promise<ComponentInput> {
    return this.componentsService.delete(id)
  }
}
