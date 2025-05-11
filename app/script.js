document.getElementById("animal-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const nascimento = document.getElementById("dataNascimento").value;
  const especie = document.getElementById("especie").value;
  const habitat = document.getElementById("habitat").value;
  const paisOrigem = document.getElementById("paisOrigem").value;
  const filhote = document.getElementById("filhote").checked;
  const genero = document.getElementById("genero").value;

  const animal = {
    nome,
    descricao,
    nascimento,
    especie,
    habitat,
    origem: paisOrigem,
    filhote,
    genero
  };

  let animais = JSON.parse(localStorage.getItem("animais")) || [];
  animais.push(animal);
  localStorage.setItem("animais", JSON.stringify(animais));
  
  alert("Animal cadastrado com sucesso!");
  window.location.href = "lista.html";
});
