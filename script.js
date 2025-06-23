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
    // Ao clicar, alterna a classe .active no elemento pai (mutation-item)
    title.addEventListener('click', function() {
      this.parentElement.classList.toggle('active');
    });
    // Ao pressionar Enter ou Espaço, também alterna
    title.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.parentElement.classList.toggle('active');
      }
    });
  });
});
