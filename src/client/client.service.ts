import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    return this.clientRepository.findOne({ where: { id } });
  }

  async create(client: Partial<Client>): Promise<Client> {
    const newClient = this.clientRepository.create(client);

    return this.clientRepository.save(newClient);
  }

  async update(id: number, client: Partial<Client>): Promise<Client> {
    await this.clientRepository.update(id, client);

    return this.clientRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
