import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Client> {
    const client = await this.clientService.findOne(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    } else {
      return client;
    }
  }

  @Post()
  async create(@Body() client: Client): Promise<Client> {
    return this.clientService.create(client);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() client: Client): Promise<any> {
    return this.clientService.update(id, client);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const client = this.clientService.findOne(id);

    if (!client) {
      throw new NotFoundException('Client not found');
    } else {
      return this.clientService.delete(id);
    }
  }
}
