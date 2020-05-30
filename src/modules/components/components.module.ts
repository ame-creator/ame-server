import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ComponentsResolver } from './components.resolver'
import { ComponentSchema } from './components.schema'
import { DateScalar } from '../../scalars/date.scalar'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Component',
      schema: ComponentSchema
    }])
  ],
  providers: [ComponentsResolver, DateScalar]
})
export class ComponentsModule {}
