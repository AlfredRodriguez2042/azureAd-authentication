import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureAdStrategy } from './azureAdStrategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'azureAd' })],
  controllers: [AppController],
  providers: [AppService, AzureAdStrategy],
})
export class AppModule {}
