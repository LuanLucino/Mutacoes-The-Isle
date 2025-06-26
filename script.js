// === EFEITOS DAS MUTAÇÕES SOBRE ATRIBUTOS ===
const efeitosMutacoes = {
  "Hemomania": { dano: 2 },
  "Featherweight": { velocidade: 2, furtividade: 1 },
  "Osteosclerosis": { resistencia: 2 },
  "Augmented Tapetum": { furtividade: 2 },
  "Cellular Regeneration": { regeneracao: 3 },
  "Cannibalistic": { dano: 1, regeneracao: 1 },
  "Reinforced Tendons": { velocidade: 1, resistencia: 1 }
  // Adicione mais mutações conforme sua lista
};

// === PREENCHE O SELECT COM OS DINOS AGRUPADOS POR DIETA ===
document.addEventListener("DOMContentLoaded", function () {
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

  listarBuilds(); // Carrega builds salvas ao iniciar
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

// === SELEÇÃO DE MUTAÇÕES ATIVAS E HERDADAS ===
let selecionadas = [];
let herdadas = [];

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

// === ATUALIZA OS PAINÉIS LATERAIS ===
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