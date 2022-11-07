import { Viagens } from './../entities/viagens.entity';
import { writeFile, readFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
@Injectable()
export class Database {
  private FILENAME = 'src/viagens/database/viagens.json';

  public async getViagens(): Promise<Viagens[]> {
    const viagensInFile = await readFile(this.FILENAME, 'utf-8');
    const viagens = JSON.parse(viagensInFile);
    return viagens;
  }

  public async gravar(viagem: Viagens) {
    let viagens = await this.getViagens();
    if (!viagens) {
      viagens = [];
    }
    await writeFile(this.FILENAME, JSON.stringify([...viagens, viagem]));
  }

  public async gravarViagens(viagens: Viagens[]) {
    await writeFile(this.FILENAME, JSON.stringify(viagens));
  }

  public async updateViagens(viagens: Viagens[]) {
    await writeFile(this.FILENAME, JSON.stringify(viagens));
  }
}
