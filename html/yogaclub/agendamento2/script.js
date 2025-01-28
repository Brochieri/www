function criarAgenda(ano, mes) {
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
    const primeiroDiaDoMes = new Date(ano, mes, 1);
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0);
    const primeiroDiaDaSemana = primeiroDiaDoMes.getDay();
    const ultimoDia = ultimoDiaDoMes.getDate();
  
    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();
    let mesAtual = dataAtual.getMonth();
    let diaAtual = dataAtual.getDate();
  
    const tabela = document.createElement('table');
    tabela.classList.add('agenda');
  
    // Cabeçalho com o mês e ano
    const cabecalho = tabela.createTHead();
    const linhaCabecalho = cabecalho.insertRow();
    const celulaCabecalho = linhaCabecalho.insertCell();
    celulaCabecalho.colSpan = 7;
    celulaCabecalho.classList.add('mes-ano');
    celulaCabecalho.textContent = `${meses[mes]} ${ano}`;
  
    // Linha com os dias da semana
    const linhaDias = tabela.insertRow();
    diasDaSemana.forEach(dia => {
      const celulaDia = linhaDias.insertCell();
      celulaDia.textContent = dia;
      celulaDia.classList.add('dia-semana');
    });
  
    let dia = 1;
    for (let i = 0; i < 6; i++) { // Até 6 semanas para cobrir todos os casos
      const linha = tabela.insertRow();
      for (let j = 0; j < 7; j++) {
        const celula = linha.insertCell();
        if (i === 0 && j < primeiroDiaDaSemana) {
          // Dias do mês anterior
          let diasMesAnterior = new Date(ano, mes, 0).getDate();
          let diaAnterior = diasMesAnterior - (primeiroDiaDaSemana - j - 1);
          celula.textContent = diaAnterior;
          celula.classList.add('dia-anterior');
          celula.addEventListener('click', () => {
            criarAgenda(mes === 0 ? ano - 1 : ano, (mes - 1 + 12) % 12);
          });
        } else if (dia > ultimoDia) {
          // Dias do próximo mês
          let diaPosterior = dia - ultimoDia;
          celula.textContent = diaPosterior;
          celula.classList.add('dia-posterior');
          celula.addEventListener('click', () => {
            criarAgenda(mes === 11 ? ano + 1 : ano, (mes + 1) % 12);
          });
          dia++;
        }
        else {
          // Dias do mês atual
          if (dia === diaAtual && mes === mesAtual && ano === anoAtual) {
            celula.classList.add('dia-atual');
          }
          celula.textContent = dia;
          dia++;
        }
      }
      if (dia > ultimoDia) break;//Para de criar linhas se já passou do ultimo dia
    }
  
    const container = document.getElementById('calendario');
    container.innerHTML = ''; // Limpa o calendário anterior
    container.appendChild(tabela);
  }
  
  // Inicializa o calendário com o mês atual
  let data = new Date();
  let ano = data.getFullYear();
  let mes = data.getMonth();
  criarAgenda(ano, mes);
  
  // Adiciona botões para avançar e retroceder o mês
  const botaoAnterior = document.createElement('button');
  botaoAnterior.textContent = '<';
  botaoAnterior.addEventListener('click', () => {
    mes--;
    if (mes < 0) {
      mes = 11;
      ano--;
    }
    criarAgenda(ano, mes);
  });
  
  const botaoProximo = document.createElement('button');
  botaoProximo.textContent = '>';
  botaoProximo.addEventListener('click', () => {
    mes++;
    if (mes > 11) {
      mes = 0;
      ano++;
    }
    criarAgenda(ano, mes);
  });
  
  const containerBotoes = document.createElement('div');
  containerBotoes.classList.add('botoes-calendario');
  containerBotoes.appendChild(botaoAnterior);
  containerBotoes.appendChild(botaoProximo);
  
  const container = document.getElementById('calendario');
  container.parentNode.insertBefore(containerBotoes, container);
  