import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ComponentsResolver } from './components.resolver';
import { ComponentSchema } from './components.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Component',
      schema: ComponentSchema
    }])
  ],
  providers: [ComponentsResolver]
})
export class ComponentsModule {}
