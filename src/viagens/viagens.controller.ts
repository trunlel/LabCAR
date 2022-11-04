import { ViagensProximas } from './entities/viagens.motorista';
import { NestResponseBuilder } from './../core/http/nest-response-builder';
import { NestResponse } from './../core/http/nest-response';
import { Viagens } from './entities/viagens.entity';
import { Controller, Post, Body, Get, HttpStatus } from '@nestjs/common';
import { ViagensService } from './viagens.service';

@Controller('viagens')
export class ViagensController {
  constructor(private service: ViagensService) {}

  @Post()
  public async criarViagem(@Body() viagem: Viagens): Promise<NestResponse> {
    const viagemCriada = await this.service.criarViagem(viagem);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `motoristas/${viagemCriada}` })
      .withBody(viagemCriada)
      .build();
  }

  @Get()
  public async buscarViagens(@Body() viagem: ViagensProximas) {
    const buscaViagem = await this.service.getViagens(viagem.endereco);
    return buscaViagem;
  }
}
