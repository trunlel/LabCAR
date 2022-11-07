import { v4 as uuidv4 } from 'uuid';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { isDataValida } from 'src/utils/valida.idade.decorator';
import { isCPFValido } from 'src/utils/valida.cpf.decorator';

export class Passageiro {
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

  @IsString()
  endereco: string;

  @IsString()
  ID = uuidv4();
}
