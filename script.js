// Alterna a exibição do menu em telas menores
function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');
}

// Mostra somente o conteúdo da aba selecionada
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(function (tab) {
    tab.style.display = "none";
  });
  document.getElementById(tabName).style.display = "block";
}

// Exibe ou oculta os detalhes das mutações
document.addEventListener("DOMContentLoaded", function () {
  const mutationTitles = document.querySelectorAll('.mutation-title');
  mutationTitles.forEach(function (title) {
    function toggleItem() {
      const container = this.closest('.mutation-items');
      container.querySelectorAll('.mutation-item').forEach(item => {
        item.classList.remove('active');
      });
      if (!this.parentElement.classList.contains('active')) {
        this.parentElement.classList.add('active');
      }
    }

    title.addEventListener('click', toggleItem);
    title.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem.call(this);
      }
    });
  });
});

// Filtro de mutações por tipo
function filtrarMutacoes(tipo) {
  const itens = document.querySelectorAll('.tab-content:not([style*="display: none"]) .mutation-item');
  itens.forEach(item => {
    const tipoItem = item.getAttribute('data-tipo');
    item.style.display = (tipo === 'todos' || tipoItem === tipo) ? 'block' : 'none';
  });
}

// SELEÇÃO DE MUTAÇÕES – MUTANTE BASE
let selecionadas = [];

function selecionarMutacao(botao) {
  const item = botao.closest('.mutation-item');
  const nome = item.querySelector('.mutation-title').innerText;

  if (selecionadas.includes(nome) || herdadas.includes(nome)) {
    alert("Essa mutação já foi escolhida!");
    return;
  }

  if (selecionadas.includes(nome)) {
    selecionadas = selecionadas.filter(i => i !== nome);
    item.classList.remove('selecionado');
  } else {
    if (selecionadas.length >= 3) {
      alert("Limite de 3 mutações atingido.");
      return;
    }
    selecionadas.push(nome);
    item.classList.add('selecionado');
  }

  atualizarPainel();
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

// SELEÇÃO DE MUTANTE FILHOTE (HERDADAS)
let herdadas = [];

function selecionarHerdada(botao) {
  const item = botao.closest('.mutation-item');
  const nome = item.querySelector('.mutation-title').innerText;

  if (herdadas.includes(nome) || selecionadas.includes(nome)) {
    alert("Essa mutação já foi escolhida!");
    return;
  }

  if (herdadas.includes(nome)) {
    herdadas = herdadas.filter(i => i !== nome);
    item.classList.remove('selecionado');
  } else {
    if (herdadas.length >= 3) {
      alert("Você já selecionou 3 mutações herdadas.");
      return;
    }
    herdadas.push(nome);
    item.classList.add('selecionado');
  }

  atualizarPainelHerdadas();
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

// RESET
function resetSelecao() {
  selecionadas = [];
  atualizarPainel();
  document.querySelectorAll('.mutation-item').forEach(item => item.classList.remove('selecionado'));
}

function resetHerdadas() {
  herdadas = [];
  atualizarPainelHerdadas();
  document.querySelectorAll('.mutation-item').forEach(item => item.classList.remove('selecionado'));
}
