import { Database } from './database/database';
import { Database as databasepassageiro } from '../passageiros/database/database';
import { Database as databasemotoristas } from '../motoristas/database/database';
import { Injectable, ConflictException } from '@nestjs/common';
import { Viagens } from './entities/viagens.entity';
import { ViagensProximas } from './entities/viagens.motorista';

@Injectable()
export class ViagensService {
  constructor(
    private database: Database,
    private databasePassageiro: databasepassageiro,
    private databaseMotoristas: databasemotoristas,
  ) {}

  public async getPassageiro(ID: string) {
    const passageiros = await this.databasePassageiro.getPassageiro();
    return passageiros.find((passageiro) => passageiro.ID == ID);
  }

  public async criarViagem(viagem: Viagens): Promise<Viagens> {
    const passageiroExiste = await this.getPassageiro(viagem.ID);
    if (!passageiroExiste) {
      throw new ConflictException({
        statusCode: 409,
        message: 'ID não cadastrado',
      });
    }
    await this.database.gravar(viagem);
    console.log(viagem);
    viagem.status;
    return viagem;
  }

  public async getViagens(endereco: string) {
    const viagens = await this.database.getViagens();
    return viagens;
  }
}
