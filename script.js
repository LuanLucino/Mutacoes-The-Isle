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
