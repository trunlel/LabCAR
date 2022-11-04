import { Database } from './database/database';
import { Module } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { MotoristaController } from './motorista.controller';

@Module({
  controllers: [MotoristaController],
  providers: [Database, MotoristaService],
})
export class MotoristaModule {}
