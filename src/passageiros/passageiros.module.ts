import { Database } from './database/database';
import { Module } from '@nestjs/common';
import { PassageirosService } from './passageiros.service';
import { PassageirosController } from './passageiros.controller';

@Module({
  controllers: [PassageirosController],
  providers: [Database, PassageirosService],
})
export class PassageirosModule {}
