import { NestResponseBuilder } from './../core/http/nest-response-builder';
import { NestResponse } from './../core/http/nest-response';
import { Motorista } from './entities/motorista.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpStatus,
  Query,
  NotFoundException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MotoristaService } from './motorista.service';

@Controller('motoristas')
export class MotoristaController {
  constructor(private service: MotoristaService) {}

  @Post()
  public async criarMotorista(
    @Body() motorista: Motorista,
  ): Promise<NestResponse> {
    const motoristaCriado = await this.service.criarMotorista(motorista);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `motoristas/${motoristaCriado.CPF}` })
      .withBody(motoristaCriado)
      .build();
  }

  @Get()
  public async buscarMotoristasPorPage(
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return await this.service.buscarMotoristas(page, size);
  }
  @Get(':CPF')
  public async buscarMotorista(@Param('CPF') CPF: number) {
    const motorista = await this.service.getMotorista(CPF);

    if (!motorista) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'CPF não encontrado',
      });
    }
    return motorista;
  }

  @Patch(':CPF')
  public async atualizarStatus(@Param('CPF') CPF: number) {
    return this.service.atualizaStatus(CPF);
  }
  @Put(':CPF')
  public async atualizaMotorista(
    @Param('CPF') CPF: number,
    @Body() body: Motorista,
  ) {
    return this.service.atualizaMotorista(CPF, body);
  }

  @Delete(':CPF')
  public async apagaMotorista(@Param('CPF') CPF: number) {
    return this.service.apagaMotorista(CPF);
  }
}
