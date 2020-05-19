import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateComponentInput, UpdateComponentInput, Component } from '@/generator/graphql.schema'

@Resolver('Component')
@Injectable()
export class ComponentsResolver {
  constructor(@InjectModel('Component') private componentModel: Model<Component>) {}

  @Query()
  async components() {
    return await this.componentModel.find().exec()
  }

  @Mutation()
  async createComponent(@Args('input') input: CreateComponentInput): Promise<Component> {
    const createdComponent = new this.componentModel(input )
    return await createdComponent.save()
  }

  @Mutation()
  async updateComponent(
    @Args('id') id: string,
    @Args('input') input: UpdateComponentInput
  ): Promise<Component> {
    return await this.componentModel.findByIdAndUpdate(id, input, { new: true })
  }

  @Mutation()
  async deleteComponent(@Args('id') id: string): Promise<Component> {
    return await this.componentModel.findByIdAndRemove(id)
  }
}
