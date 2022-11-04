import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  Length,
  MaxLength,
} from 'class-validator';

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
  dataNascimento: Date;

  @IsNotEmpty()
  @IsNumberString(
    {},
    {
      message: 'CPF aceita apenas números',
    },
  )
  @Length(11, 11)
  CPF: number;

  @IsNotEmpty()
  placa: string;

  @IsNotEmpty()
  modelo: string;

  @IsBoolean()
  blocked = false;
}
