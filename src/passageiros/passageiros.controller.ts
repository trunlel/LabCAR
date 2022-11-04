import { NestResponseBuilder } from './../core/http/nest-response-builder';
import { Passageiro } from './entities/passageiro.entity';
import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Query,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PassageirosService } from './passageiros.service';
import { NestResponse } from 'src/core/http/nest-response';

@Controller('passageiros')
export class PassageirosController {
  constructor(private service: PassageirosService) {}

  @Post()
  public async criarPassageiro(
    @Body() passageiro: Passageiro,
  ): Promise<NestResponse> {
    const passageiroCriado = await this.service.criarPassageiro(passageiro);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `passageiros/${passageiroCriado.CPF}` })
      .withBody(passageiroCriado)
      .build();
  }
  @Get(':CPF')
  public async buscarPassageiro(@Param('CPF') CPF: number) {
    const passageiroBuscado = await this.service.buscaPassageiro(CPF);
    return passageiroBuscado;
  }
  @Get()
  public async buscarPassageirosPorPage(
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return await this.service.buscaPassageiros(page, size);
  }
  @Put(':CPF')
  public async atualizaPassageiro(
    @Param('CPF') CPF: number,
    @Body() body: Passageiro,
  ) {
    return this.service.atualizaPassageiro(CPF, body);
  }

  @Delete(':CPF')
  public async apagaPassageiro(@Param('CPF') CPF: number) {
    return this.service.apagaPassageiro(CPF);
  }
}
