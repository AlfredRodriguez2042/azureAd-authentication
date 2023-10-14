import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AzureAdGuard } from './azureAdStrategy';
@UseGuards(AzureAdGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return { data: this.appService.getHello() };
  }
}
