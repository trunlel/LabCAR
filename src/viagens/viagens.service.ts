import { NestResponseBuilder } from './../core/http/nest-response-builder';
import { Database } from './database/database';
import { Database as databasepassageiro } from '../passageiros/database/database';
import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { Viagens } from './entities/viagens.entity';

@Injectable()
export class ViagensService {
  constructor(
    private database: Database,
    private databasePassageiro: databasepassageiro,
  ) {}

  public async getPassageiro(ID: string) {
    const passageiros = await this.databasePassageiro.getPassageiro();
    return passageiros.find((passageiro) => passageiro.ID == ID);
  }

  public async criarViagem(viagem: Viagens): Promise<Viagens> {
    const passageiroExiste = await this.getPassageiro(viagem.ID);
    if (!passageiroExiste) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'ID não cadastrado',
      });
    }
    await this.database.gravar(viagem);
    console.log(viagem);
    viagem.status;
    return viagem;
  }

  public async getViagens(endereco: string) {
    const travels = await this.database.getViagens();
    const driverAddress = { endereco };
    const createdTravels = travels.filter(
      (travels) => travels.status === 'CREATED',
    );

    const body = { driverAddress, createdTravels };
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: 'viagens/proximas' })
      .withBody(body)
      .build();
  }
}
