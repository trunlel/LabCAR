import isMaiorDeIdade from 'src/utils/valida.idade';
import { NestResponseBuilder } from './../core/http/nest-response-builder';
import { Motorista } from './entities/motorista.entity';
import { Database } from './database/database';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import isValidCPF from 'src/utils/valida.cpf';

@Injectable()
export class MotoristaService {
  constructor(private database: Database) {}

  public async getMotorista(CPF: number) {
    const motoristas = await this.database.getMotoristas();
    return motoristas.find((motorista) => motorista.CPF == CPF);
  }

  public async criarMotorista(motorista: Motorista): Promise<Motorista> {
    const motoristaExiste = await this.getMotorista(motorista.CPF);
    if (motoristaExiste) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF já cadastrado',
      });
    }

    const CPFValido = isValidCPF(motorista.CPF);
    if (!CPFValido) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'CPF invalido',
      });
    }
    const maiorQue = isMaiorDeIdade(motorista.dataNascimento);
    if (!maiorQue) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Somente maiores de 18 anos.',
      });
    }

    await this.database.gravar(motorista);
    motorista.blocked = false;
    return motorista;
  }

  public async buscarMotoristas(page, size) {
    return await (
      await this.database.getMotoristas()
    ).slice(page * size, page * size + size);
  }

  public async atualizaStatus(CPF: number) {
    const motorista = await this.getMotorista(CPF);
    if (!motorista) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'CPF não cadastrado',
      });
    }
    const motoristas = await this.database.getMotoristas();

    const atualizaMotoristas = (await motoristas).map((motorista) => {
      if (motorista.CPF == CPF) {
        motorista.blocked = true;
        console.log(motorista.blocked);
      }
      return motorista;
    });
    await this.database.updateMotorista(atualizaMotoristas);
    const atualizaMotorista = atualizaMotoristas.filter(
      (motorista) => motorista.CPF == CPF,
    );
    return atualizaMotorista;
  }

  public async atualizaMotorista(CPF: number, body: Motorista) {
    const motorista = await this.getMotorista(CPF);
    if (!motorista) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'CPF não cadastrado',
      });
    }
    const motoristas = await this.database.getMotoristas();
    const atualizaMotoristas = (await motoristas).map((motorista) => {
      if (motorista.CPF == CPF) {
        motorista.blocked = body.blocked;
        motorista.CPF = body.CPF;
        motorista.dataNascimento = body.dataNascimento;
        motorista.modelo = body.modelo;
        motorista.nome = body.nome;
        motorista.placa = body.placa;
      }
      return motorista;
    });
    const motoristaExiste = await this.getMotorista(body.CPF);
    if (motoristaExiste) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF já cadastrado',
      });
    }

    await this.database.updateMotorista(atualizaMotoristas);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `motoristas/${body.CPF}` })
      .withBody(body)
      .build();
  }
  public async apagaMotorista(CPF: number) {
    const motorista = await this.getMotorista(CPF);
    const motoristas = await this.database.getMotoristas();
    if (!motorista) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'CPF não cadastrado',
      });
    }
    const novaLista = motoristas.filter((motorista) => motorista.CPF != CPF);
    await this.database.gravarMotoristas(novaLista);
  }
}
