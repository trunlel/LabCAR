import { Database } from './database/database';
import { Database as DatabaseMotorista } from '../motoristas/database/database';
import { Database as DatabasePassageiro } from '../passageiros/database/database';
import { Module } from '@nestjs/common';
import { ViagensService } from './viagens.service';
import { ViagensController } from './viagens.controller';

@Module({
  controllers: [ViagensController],
  providers: [Database, DatabaseMotorista, DatabasePassageiro, ViagensService],
})
export class ViagensModule {}
