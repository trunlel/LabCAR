import { TipoStatus } from './viagens.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class Viagens {
  @IsNotEmpty()
  ID: string;

  @IsNotEmpty()
  origem: string;

  @IsNotEmpty()
  destino: string;

  @IsEnum(TipoStatus)
  status = 'CREATED';
}
