import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentsModule } from './modules/components/components.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        typePaths: ['./**/*.graphql'],
      }),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/ame'),
    ComponentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
