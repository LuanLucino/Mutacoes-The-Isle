// === EFEITOS DAS MUTAÇÕES SOBRE ATRIBUTOS ===
const efeitosMutacoes = {
  "Hemomania": { dano: 2 },
  "Featherweight": { velocidade: 2, furtividade: 1 },
  "Osteosclerosis": { resistencia: 2 },
  "Augmented Tapetum": { furtividade: 2 },
  "Cellular Regeneration": { regeneracao: 3 },
  "Cannibalistic": { dano: 1, regeneracao: 1 },
  "Reinforced Tendons": { velocidade: 1, resistencia: 1 }
};

let selecionadas = [];
let herdadas = [];
let graficoCombate = null;

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById('select-dino');
  select.innerHTML = '';

  const optionBase = document.createElement('option');
  optionBase.value = '';
  optionBase.textContent = '-- Nenhum selecionado --';
  optionBase.disabled = true;
  optionBase.selected = true;
  optionBase.classList.add('placeholder-option');
  select.appendChild(optionBase);

  const tipos = { "Carnívoro": [], "Herbívoro": [], "Onívoro": [] };

  dadosDinos.dinossauros.forEach(dino => {
    const dietas = dino.dieta.map(d => d.toLowerCase());
    if (dietas.includes("onívoro")) tipos["Onívoro"].push(dino);
    else if (dietas.includes("herbívoro")) tipos["Herbívoro"].push(dino);
    else tipos["Carnívoro"].push(dino);
  });

  for (const tipo in tipos) {
    const group = document.createElement('optgroup');
    group.label = `🦕 ${tipo}`;
    tipos[tipo].forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.nome;
      opt.textContent = d.nome;
      group.appendChild(opt);
    });
    select.appendChild(group);
  }

  carregarConteudoMutacoes();
  carregarConteudoDesbloqueaveis();
  preencherSelectCombate();
  listarBuilds?.();
});

// === ATUALIZA O PAINEL DO DINOSSAURO SELECIONADO ===
function atualizarSimulador() {
  const select = document.getElementById('select-dino');
  const nome = select.value;
  const painel = document.getElementById('atributos-dino');

  const dino = dadosDinos.dinossauros.find(d => d.nome === nome);
  if (!dino) {
    painel.innerHTML = `
      <li>Velocidade: —</li>
      <li>Mordida: —</li>
      <li>Peso: —</li>
      <li>Habilidade: —</li>
      <li>Grupo Máximo: —</li>
    `;
    document.getElementById('barras-atributos').innerHTML = '';
    return;
  }

  painel.innerHTML = `
    <li>Velocidade: ${dino.velocidade_kmh} km/h</li>
    <li>Mordida: ${dino.mordida}</li>
    <li>Peso: ${dino.peso_kg} kg</li>
    <li>Habilidade: ${dino.habilidade}</li>
    <li>Grupo Máximo: ${dino.grupo_max}</li>
  `;

  calcularAtributosFinais();
}

// === CALCULA E MOSTRA OS ATRIBUTOS FINAIS COM MUTAÇÕES ===
function calcularAtributosFinais() {
  const select = document.getElementById('select-dino');
  const nome = select.value;
  const barra = document.getElementById('barras-atributos');
  barra.innerHTML = '';

  const dino = dadosDinos.dinossauros.find(d => d.nome === nome);
  if (!dino || !dino.atributos_base) {
    barra.innerHTML = '<p>Selecione um dinossauro para ver os atributos.</p>';
    return;
  }

  const atributos = { ...dino.atributos_base };

  [...selecionadas, ...herdadas].forEach(nomeMut => {
    const efeito = efeitosMutacoes[nomeMut];
    if (!efeito) return;
    for (let key in efeito) {
      atributos[key] = (atributos[key] || 0) + efeito[key];
    }
  });

  const labels = {
    dano: "Dano Estratégico",
    velocidade: "Velocidade",
    resistencia: "Resistência",
    furtividade: "Furtividade",
    regeneracao: "Regeneração"
  };

  for (let key in atributos) {
    const val = Math.min(atributos[key], 10);
    const linha = document.createElement('div');
    linha.className = 'linha-atributo';
    linha.innerHTML = `
      <span class="label">${labels[key]}</span>
      <div class="barra">
        <div class="preenchimento" style="width: ${val * 10}%;"></div>
      </div>
      <span class="valor">${val}</span>
    `;
    barra.appendChild(linha);
  }
}

// === FILTRA MUTAÇÕES POR TIPO ===
function filtrarMutacoes(tipo) {
  const itens = document.querySelectorAll('.tab-content:not([style*="display: none"]) .mutation-item');
  itens.forEach(item => {
    const tipoItem = item.getAttribute('data-tipo');
    item.style.display = (tipo === 'todos' || tipoItem === tipo) ? 'block' : 'none';
  });
}

// === SELEÇÃO DE MUTAÇÕES ===
function selecionarMutacao(botao) {
  const item = botao.closest('.mutation-item');
  const nome = item.querySelector('.mutation-title')?.innerText.trim();

  if (selecionadas.includes(nome)) {
    selecionadas = selecionadas.filter(i => i !== nome);
    item.classList.remove('selecionado');
  } else {
    if (selecionadas.length >= 3) {
      alert("Limite de 3 mutações ativas.");
      return;
    }
    if (herdadas.includes(nome)) {
      alert("Essa mutação já está herdada.");
      return;
    }
    selecionadas.push(nome);
    item.classList.add('selecionado');
  }

  atualizarPainel();
  gerarResumo();
  calcularAtributosFinais();
}

function selecionarHerdada(botao) {
  const item = botao.closest('.mutation-item');
  const nome = item.querySelector('.mutation-title')?.innerText.trim();

  if (herdadas.includes(nome)) {
    herdadas = herdadas.filter(i => i !== nome);
    item.classList.remove('selecionado');
  } else {
    if (herdadas.length >= 3) {
      alert("Você já herdou 3 mutações.");
      return;
    }
    if (selecionadas.includes(nome)) {
      alert("Essa mutação já está ativa.");
      return;
    }
    herdadas.push(nome);
    item.classList.add('selecionado');
  }

  atualizarPainelHerdadas();
  gerarResumo();
  calcularAtributosFinais();
}

function atualizarPainel() {
  const lista = document.getElementById('selected-list');
  lista.innerHTML = '';
  selecionadas.forEach(nome => {
    const li = document.createElement('li');
    li.textContent = nome;
    lista.appendChild(li);
  });
  document.getElementById('slot-count').textContent = `${selecionadas.length}/3 Selecionadas`;
}

function atualizarPainelHerdadas() {
  const lista = document.getElementById('selected-herdadas');
  lista.innerHTML = '';
  herdadas.forEach(nome => {
    const li = document.createElement('li');
    li.textContent = nome;
    lista.appendChild(li);
  });
  document.getElementById('slot-herdadas').textContent = `${herdadas.length}/3 Selecionadas`;
}

function resetSelecao() {
  selecionadas = [];
  document.querySelectorAll('.mutation-item').forEach(item => item.classList.remove('selecionado'));
  atualizarPainel();
  gerarResumo();
  calcularAtributosFinais();
}

function resetHerdadas() {
  herdadas = [];
  document.querySelectorAll('.mutation-item').forEach(item => item.classList.remove('selecionado'));
  atualizarPainelHerdadas();
  gerarResumo();
  calcularAtributosFinais();
}

// === GERA RESUMO COM NOME + DESCRIÇÃO ===
function localizarMutacao(nome) {
  const todas = document.querySelectorAll('.mutation-item');
  for (const item of todas) {
    const titulo = item.querySelector('.mutation-title')?.innerText.trim();
    const detalhe = item.querySelector('.mutation-detail')?.innerText;
    if (titulo === nome) {
      return { nome: titulo, descricao: detalhe };
    }
  }
  return { nome, descricao: 'Descrição não encontrada.' };
}

function gerarResumo() {
  const ulAtivas = document.getElementById('resumo-ativas');
  const ulHerdadas = document.getElementById('resumo-herdadas');
  if (!ulAtivas || !ulHerdadas) return;

  ulAtivas.innerHTML = '';
  ulHerdadas.innerHTML = '';

  selecionadas.forEach(nome => {
    const li = document.createElement('li');
    const item = localizarMutacao(nome);
    li.innerHTML = `<strong>${item.nome}</strong>: ${item.descricao}`;
    ulAtivas.appendChild(li);
  });

  herdadas.forEach(nome => {
    const li = document.createElement('li');
    const item = localizarMutacao(nome);
    li.innerHTML = `<strong>${item.nome}</strong>: ${item.descricao}`;
    ulHerdadas.appendChild(li);
  });
}

// === CARREGAMENTO DINÂMICO DE CONTEÚDO ===
function carregarConteudoMutacoes() {
  fetch('mutacoes.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('mutacoes-container').innerHTML = html;
      inicializarAcordeao();
    });
}

function carregarConteudoDesbloqueaveis() {
  fetch('desbloqueaveis.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('desbloqueaveis-container').innerHTML = html;
      inicializarAcordeao();
    });
}

// === AÇÕES DE ABA E ACORDEÃO ===
function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  const tab = document.getElementById(tabId);
  if (tab) tab.style.display = 'block';
}

function inicializarAcordeao() {
  const titles = document.querySelectorAll('.mutation-title');

  titles.forEach(title => {
    title.addEventListener('click', () => toggleItem(title));
    title.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(title);
      }
    });
  });
}

function toggleItem(titleElement) {
  const container = titleElement.closest('.mutation-items');
  const allItems = container.querySelectorAll('.mutation-item');
  allItems.forEach(item => item.classList.remove('active'));

  const parent = titleElement.parentElement;
  if (!parent.classList.contains('active')) {
    parent.classList.add('active');
  }
}

// === COMBATE ===
function preencherSelectCombate() {
  const selects = [document.getElementById('dino-a'), document.getElementById('dino-b')];
  selects.forEach(select => {
    select.innerHTML = '';
    const optionBase = document.createElement('option');
    optionBase.value = '';
    optionBase.textContent = '-- Selecione --';
    optionBase.disabled = true;
    optionBase.selected = true;
    select.appendChild(optionBase);

    const tipos = { "Carnívoro": [], "Herbívoro": [], "Onívoro": [] };

    dadosDinos.dinossauros.forEach(dino => {
      const dietas = dino.dieta.map(d => d.toLowerCase());
      if (dietas.includes("onívoro")) tipos["Onívoro"].push(dino);
      else if (dietas.includes("herbívoro")) tipos["Herbívoro"].push(dino);
      else tipos["Carnívoro"].push(dino);
    });

    for (const tipo in tipos) {
      const group = document.createElement('optgroup');
      group.label = `🦕 ${tipo}`;
      tipos[tipo].forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.nome;
        opt.textContent = d.nome;
        group.appendChild(opt);
      });
      select.appendChild(group);
    }
  });
}

function obterMutacoesSelecionadas(idContainer) {
  const container = document.getElementById(idContainer);
  const selecionadas = container.querySelectorAll('.mutacao-btn.selecionada');
  return Array.from(selecionadas).map(btn => btn.textContent.trim());
}

function simularCombate() {
  const nomeA = document.getElementById('dino-a').value;
  const nomeB = document.getElementById('dino-b').value;
  const mutacoesA = obterMutacoesSelecionadas('mutacoes-a');
  const mutacoesB = obterMutacoesSelecionadas('mutacoes-b');
  const resultado = document.getElementById('resultado-combate-texto');

  if (!nomeA || !nomeB) {
    resultado.textContent = "Selecione dois dinossauros para comparar.";
    return;
  }

  const dinoA = dadosDinos.dinossauros.find(d => d.nome === nomeA);
  const dinoB = dadosDinos.dinossauros.find(d => d.nome === nomeB);

  const atributosA = { ...dinoA.atributos_base };
  const atributosB = { ...dinoB.atributos_base };

  mutacoesA.forEach(nome => {
    const efeito = efeitosMutacoes[nome];
    if (!efeito) return;
    for (let key in efeito) {
      atributosA[key] = (atributosA[key] || 0) + efeito[key];
    }
  });

  mutacoesB.forEach(nome => {
    const efeito = efeitosMutacoes[nome];
    if (!efeito) return;
    for (let key in efeito) {
      atributosB[key] = (atributosB[key] || 0) + efeito[key];
    }
  });

  let pontosA = 0;
  let pontosB = 0;

  const comparar = (key) => {
    if ((atributosA[key] || 0) > (atributosB[key] || 0)) pontosA++;
    else if ((atributosB[key] || 0) > (atributosA[key] || 0)) pontosB++;
  };

  comparar('dano');
  comparar('velocidade');
  comparar('resistencia');
  comparar('furtividade');
  comparar('regeneracao');

  if (pontosA > pontosB) {
    resultado.textContent = `🏆 ${dinoA.nome} tem vantagem no combate!`;
  } else if (pontosB > pontosA) {
    resultado.textContent = `🏆 ${dinoB.nome} tem vantagem no combate!`;
  } else {
    resultado.textContent = "⚖️ Empate técnico! Ambos são equilibrados.";
  }

  // Gráfico
  const labels = ['Dano', 'Velocidade', 'Resistência', 'Furtividade', 'Regeneração'];
  const dadosA = [
    atributosA.dano || 0,
    atributosA.velocidade || 0,
    atributosA.resistencia || 0,
    atributosA.furtividade || 0,
    atributosA.regeneracao || 0
  ];
  const dadosB = [
    atributosB.dano || 0,
    atributosB.velocidade || 0,
    atributosB.resistencia || 0,
    atributosB.furtividade || 0,
    atributosB.regeneracao || 0
  ];

  if (graficoCombate) graficoCombate.destroy();

  const ctx = document.getElementById('grafico-combate').getContext('2d');
  graficoCombate = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [
        {
          label: dinoA.nome,
          data: dadosA,
          backgroundColor: 'rgba(0, 220, 180, 0.2)',
          borderColor: 'rgba(0, 220, 180, 1)',
          pointBackgroundColor: 'rgba(0, 220, 180, 1)'
        },
        {
          label: dinoB.nome,
          data: dadosB,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointBackgroundColor: 'rgba(255, 99, 132, 1)'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 10,
          ticks: { stepSize: 1, color: '#ccc' },
          grid: { color: '#444' },
          pointLabels: {
            color: '#fff',
            font: { size: 14 }
          }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#fff' }
        }
      }
    }
  });
}

function atualizarCombatente(letra) {
  const select = document.getElementById(`dino-${letra}`);
  const nome = select.value;
  const painel = document.getElementById(`atributos-${letra}`);
  const mutacoes = obterMutacoesSelecionadas(`mutacoes-${letra}`);

  const dino = dadosDinos.dinossauros.find(d => d.nome === nome);
  if (!dino) {
    painel.innerHTML = '<li>Selecione um dinossauro</li>';
    return;
  }

  const atributos = { ...dino.atributos_base };
  mutacoes.forEach(nomeMut => {
    const efeito = efeitosMutacoes[nomeMut];
    if (!efeito) return;
    for (let key in efeito) {
      atributos[key] = (atributos[key] || 0) + efeito[key];
    }
  });

  painel.innerHTML = `
    <li>Velocidade: ${atributos.velocidade || dino.velocidade_kmh}</li>
    <li>Dano Estratégico: ${atributos.dano || dino.mordida}</li>
    <li>Resistência: ${atributos.resistencia || 0}</li>
    <li>Furtividade: ${atributos.furtividade || 0}</li>
    <li>Regeneração: ${atributos.regeneracao || 0}</li>
  `;
}

// === EXPORTAÇÃO DO GRÁFICO ===
function exportarGrafico() {
  const canvas = document.getElementById('grafico-combate');
  const link = document.createElement('a');
  link.download = 'grafico-combate.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}