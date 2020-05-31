import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ComponentsModule } from './modules/components/components.module'
import { PagesModule } from './modules/pages/page.module'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(process.cwd(), 'src/generator/graphql.schema.ts'),
          outputAs: 'class'
        }
      }),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/ame'),
    ComponentsModule,
    PagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
