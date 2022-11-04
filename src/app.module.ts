import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { MotoristaModule } from './motoristas/motorista.module';
import { PassageirosModule } from './passageiros/passageiros.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ViagensModule } from './viagens/viagens.module';
@Module({
  imports: [MotoristaModule, PassageirosModule, ViagensModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
