import { Motorista } from './../entities/motorista.entity';
import { writeFile, readFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Database {
  private FILENAME = 'src/motoristas/database/motorista.json';

  public async getMotoristas(): Promise<Motorista[]> {
    const motoristasInFile = await readFile(this.FILENAME, 'utf-8');
    const motoristas = JSON.parse(motoristasInFile);
    return motoristas;
  }

  public async gravar(motorista: Motorista) {
    let motoristas = await this.getMotoristas();
    if (!motoristas) {
      motoristas = [];
    }
    await writeFile(this.FILENAME, JSON.stringify([...motoristas, motorista]));
  }

  public async gravarMotoristas(motoristas: Motorista[]) {
    await writeFile(this.FILENAME, JSON.stringify(motoristas));
  }

  public async updateMotorista(motoristas: Motorista[]) {
    await writeFile(this.FILENAME, JSON.stringify(motoristas));
  }
}
