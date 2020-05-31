import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PageResolver } from './pages.resolver'
import { PageSchema } from './pages.scheme'
import { DateScalar } from '../../scalars/date.scalar'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Page',
      schema: PageSchema
    }])
  ],
  providers: [PageResolver, DateScalar]
})
export class PagesModule {}
