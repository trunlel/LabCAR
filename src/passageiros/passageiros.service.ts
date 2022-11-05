import isValidCPF from 'src/utils/valida.cpf';
import { Database } from './database/database';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Passageiro } from './entities/passageiro.entity';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import isMaiorDeIdade from 'src/utils/valida.idade';

@Injectable()
export class PassageirosService {
  constructor(private database: Database) {}

  public async getPassageiro(CPF: number) {
    const passageiros = await this.database.getPassageiro();
    return passageiros.find((passageiro) => passageiro.CPF == CPF);
  }

  public async criarPassageiro(passageiro: Passageiro): Promise<Passageiro> {
    const passageiroExiste = await this.getPassageiro(passageiro.CPF);
    if (passageiroExiste) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF já cadastrado',
      });
    }
    const CPFValido = isValidCPF(passageiro.CPF);
    if (!CPFValido) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'CPF invalido',
      });
    }
    const maiorQue = isMaiorDeIdade(passageiro.dataNascimento);
    if (!maiorQue) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Somente maiores de 18 anos.',
      });
    }
    await this.database.gravar(passageiro);
    passageiro.ID;
    return passageiro;
  }

  public async buscaPassageiro(CPF: number) {
    const passageiro = await this.getPassageiro(CPF);
    if (!passageiro) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'CPF não encontrado',
      });
    }
    return passageiro;
  }

  public async buscaPassageiros(page, size) {
    return await (
      await this.database.getPassageiro()
    ).slice(page * size, page * size + size);
  }

  public async atualizaPassageiro(CPF: number, body: Passageiro) {
    const passageiro = await this.getPassageiro(CPF);
    if (!passageiro) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'CPF não cadastrado',
      });
    }
    const passageiros = await this.database.getPassageiro();
    const atualizaPassageiros = (await passageiros).map((passageiro) => {
      if (passageiro.CPF == CPF) {
        passageiro.CPF = body.CPF;
        passageiro.dataNascimento = body.dataNascimento;
        passageiro.nome = body.nome;
        passageiro.endereco = body.endereco;
      }
      return passageiro;
    });
    const passageiroExiste = await this.getPassageiro(body.CPF);
    if (passageiroExiste) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF já cadastrado',
      });
    }
    await this.database.updatePassageiro(atualizaPassageiros);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `passageiros/${body.CPF}` })
      .withBody(body)
      .build();
  }
  public async apagaPassageiro(CPF: number) {
    const passageiro = await this.getPassageiro(CPF);
    const passageiros = await this.database.getPassageiro();
    if (!passageiro) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'CPF não cadastrado',
      });
    }
    const novaLista = passageiros.filter((passageiro) => passageiro.CPF != CPF);
    await this.database.gravarPassageiro(novaLista);
  }
}
