export default function isMaiorDeIdade(dataDeNascimento) {
  const dataDeNascimentoSeparada = dataDeNascimento.split('-');
  const [anoDeNascimento, mesDeNascimento, diaDeNascimento] =
    dataDeNascimentoSeparada;

  const data = new Date();
  const anoAtual = data.getFullYear();
  const mesAtual = data.getMonth() + 1;
  const diaAtual = data.getDate();
  if (anoAtual - Number(anoDeNascimento) >= 18) {
    if (mesAtual - Number(mesDeNascimento) <= 0) {
      if (Number(diaDeNascimento) - diaAtual <= 0) {
        return true;
      }
    }
  }
  return false;
}
