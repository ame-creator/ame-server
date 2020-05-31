import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Page, CreatePageInput } from '@/generator/graphql.schema'
import { Page as PageDocument } from './pages.scheme'

@Resolver('Page')
@Injectable()
export class PageResolver {
  constructor(@InjectModel('Page') private readonly pageModel: Model<PageDocument>) { }

  @Query()
  async pages(): Promise<Page[]> {
    return await this.pageModel.find().exec()
  }

  @Query()
  async pageById(@Args('id') id: string): Promise<Page> {
    return await this.pageModel.findById(id).exec()
  }

  @Mutation()
  async createPage(@Args('input') input: CreatePageInput): Promise<Page> {
    const createdPage = new this.pageModel(input)
    return await createdPage.save()
  }
}
