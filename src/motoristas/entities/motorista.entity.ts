import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  Length,
  MaxLength,
} from 'class-validator';
import { isCPFValido } from 'src/utils/valida.cpf.decorator';
import { isDataValida } from 'src/utils/valida.idade.decorator';

export class Motorista {
  @MaxLength(50, {
    message: 'Porfavor, digite no máximo 50 caracteres',
  })
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsDateString(
    {},
    {
      message: 'Formato invalido, porfavor utilize: YYYY-MM-DD',
    },
  )
  @isDataValida()
  dataNascimento: Date;

  @IsNotEmpty()
  @IsNumberString(
    {},
    {
      message: 'CPF aceita apenas números',
    },
  )
  @Length(11, 11)
  @isCPFValido()
  CPF: number;

  @IsNotEmpty()
  placa: string;

  @IsNotEmpty()
  modelo: string;

  @IsBoolean()
  blocked = false;
}
