// script.js

function mostrarPagina(paginaId) {
  const paginas = document.querySelectorAll('.pagina');
  paginas.forEach(pagina => pagina.classList.remove('active'));
  document.getElementById(paginaId).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnMutacoes').addEventListener('click', () => mostrarPagina('paginaMutacoes'));
  document.getElementById('btnDesbloqueaveis').addEventListener('click', () => mostrarPagina('paginaDesbloqueaveis'));

  // Mostrar a primeira página ao carregar
  mostrarPagina('paginaMutacoes');
});