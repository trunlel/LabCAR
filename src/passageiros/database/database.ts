import { Passageiro } from './../entities/passageiro.entity';
import { writeFile, readFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Database {
  private FILENAME = 'passageiro.json';

  public async getPassageiro(): Promise<Passageiro[]> {
    const passageirosInFile = await readFile(this.FILENAME, 'utf-8');
    const passageiros = JSON.parse(passageirosInFile);
    return passageiros;
  }

  public async gravar(passageiro: Passageiro) {
    let passageiros = await this.getPassageiro();
    if (!passageiros) {
      passageiros = [];
    }
    await writeFile(
      this.FILENAME,
      JSON.stringify([...passageiros, passageiro]),
    );
  }

  public async gravarPassageiro(passageiros: Passageiro[]) {
    await writeFile(this.FILENAME, JSON.stringify(passageiros));
  }

  public async updatePassageiro(passageiros: Passageiro[]) {
    await writeFile(this.FILENAME, JSON.stringify(passageiros));
  }
}
