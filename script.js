// Alterna a exibição do menu em telas menores
function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');
}

// Mostra somente o conteúdo da aba selecionada
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(function(tab) {
    tab.style.display = "none";
  });
  document.getElementById(tabName).style.display = "block";
}

// Adiciona listeners para interação acessível (clique e teclado) em cada título de item
document.addEventListener("DOMContentLoaded", function() {
  const mutationTitles = document.querySelectorAll('.mutation-title');
  
  mutationTitles.forEach(function(title) {
    // Função que alterna apenas o item clicado (dentro do seu contêiner)
    function toggleItem() {
      // Obtem o contêiner pai dos itens de mutação
      const container = this.closest('.mutation-items');
      // Fecha todos os itens dentro deste contêiner
      container.querySelectorAll('.mutation-item').forEach(item => {
        item.classList.remove('active');
      });
      // Abre (ativa) somente o item clicado, se ele não estava aberto
      if (!this.parentElement.classList.contains('active')) {
        this.parentElement.classList.add('active');
      }
    }
    
    // Listener de clique
    title.addEventListener('click', toggleItem);
    
    // Listener de teclado para Enter ou Espaço
    title.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem.call(this);
      }
    });
  });
});
