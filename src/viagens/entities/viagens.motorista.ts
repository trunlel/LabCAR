import { IsNotEmpty, IsString } from 'class-validator';

export class ViagensProximas {
  @IsString()
  @IsNotEmpty()
  endereco: any;
}
