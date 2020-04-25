import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ComponentsService } from './components.service';
import { ComponentsResolver } from './components.resolver';
import { ComponentSchema } from './components.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Component',
      schema: ComponentSchema
    }])
  ],
  providers: [ComponentsService, ComponentsResolver]
})
export class ComponentsModule {}
