import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ComponentType } from './dto/create-component.dto'
import { Component } from './interfaces/component.interface'
import { ComponentInput } from './input-components.input'

@Injectable()
export class ComponentsService {
  constructor(@InjectModel('Component') private componentModel: Model<Component>) {

  }

  async create(createComponentDto: ComponentInput): Promise<ComponentType> {
    const createdComponent = new this.componentModel(createComponentDto)
    return await createdComponent.save()
  }

  async findAll(): Promise<ComponentType[]> {
    return await this.componentModel.find().exec()
  }

  async findOne(id: string): Promise<ComponentType> {
    return await this.componentModel.findOne({  _id: id })
  }

  async delete(id: string): Promise<ComponentType> {
    return await this.componentModel.findByIdAndRemove(id)
  }

  async update(id: string, component: Component): Promise<ComponentType> {
    return await this.componentModel.findByIdAndUpdate(id, component, { new: true })
  }
}
