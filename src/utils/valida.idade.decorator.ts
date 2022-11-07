import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Database } from '../motoristas/database/database';

@Injectable()
@ValidatorConstraint()
export class IsDataValidaConstraint implements ValidatorConstraintInterface {
  constructor(private database: Database) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const dataDeNascimentoSeparada = value.split('-');
    const [anoDeNascimento, mesDeNascimento, diaDeNascimento] =
      dataDeNascimentoSeparada;

    const data = new Date();
    const anoAtual = data.getFullYear();
    const mesAtual = data.getMonth() + 1;
    const diaAtual = data.getDate();
    if (anoAtual - anoDeNascimento >= 18) {
      const mesteste = mesAtual - mesDeNascimento <= 0;
      if (!!mesteste) {
        if (diaDeNascimento - diaAtual <= 0) {
          return true;
        }
      }
    }
    return false;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Somente maiores de 18 anos podem se cadastrar!';
  }
}

export function isDataValida(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsDataValidaConstraint,
    });
  };
}
