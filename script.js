class Data {
    constructor(dia, mes) {
      this.dia = dia;
      this.mes = mes;
    }
  }
  
  class Contato {
    constructor(nome, telefone, celular, email, dataAniversario) {
      this.nome = nome;
      this.telefone = telefone;
      this.celular = celular;
      this.email = email;
      this.dataAniversario = dataAniversario;
      this.proximo = null;
    }
  }
  
  function insereContato(agenda, novoContato) {
    if (agenda === null) {
      return novoContato;
    } else if (novoContato.nome < agenda.nome) {
      novoContato.proximo = agenda;
      return novoContato;
    } else {
      let anterior = null;
      let atual = agenda;
  
      while (atual !== null && novoContato.nome > atual.nome) {
        anterior = atual;
        atual = atual.proximo;
      }
  
      if (atual === null) {
        anterior.proximo = novoContato;
      } else {
        novoContato.proximo = atual;
        anterior.proximo = novoContato;
      }
  
      return agenda;
    }
  }
  
  function removeContato(agenda, nomeBusca) {
    let anterior = null;
    let atual = agenda;
  
    while (atual !== null && atual.nome !== nomeBusca) {
      anterior = atual;
      atual = atual.proximo;
    }
  
    if (atual !== null) {
      if (anterior === null) {
        agenda = atual.proximo;
      } else {
        anterior.proximo = atual.proximo;
      }
    } else {
      console.log("Contato não encontrado!");
    }
  
    return agenda;
  }
  
  function removeDuplicados(agenda) {
    let atual = agenda;
    while (atual !== null && atual.proximo !== null) {
      let anterior = atual;
      let verificador = atual.proximo;
      while (verificador !== null) {
        if (atual.nome === verificador.nome) {
          anterior.proximo = verificador.proximo;
          verificador = anterior.proximo;
        } else {
          anterior = verificador;
          verificador = verificador.proximo;
        }
      }
      atual = atual.proximo;
    }
    return agenda;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    let agenda = null;
  
    // Função para criar um novo contato com os dados do formulário
    function criarContato() {
      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const celular = document.getElementById("celular").value;
      const email = document.getElementById("email").value;
      const dia = parseInt(document.getElementById("dia").value);
      const mes = parseInt(document.getElementById("mes").value);
  
      return new Contato(nome, telefone, celular, email, new Data(dia, mes));
    }
  
    // Função para adicionar um novo contato à agenda
    function adicionarContato(event) {
      event.preventDefault(); // Evita o comportamento padrão do formulário
  
      const novoContato = criarContato();
      agenda = insereContato(agenda, novoContato);
  
      // Limpa os campos do formulário após adicionar o contato
      document.getElementById("contact-form").reset();
  
      // Atualiza a tabela de contatos
      listarContatos();
    }
  
    // Função para listar os contatos na tabela HTML
    function listarContatos() {
      const tbody = document.querySelector("#contacts-table tbody");
      tbody.innerHTML = ""; // Limpa o conteúdo anterior da tabela
  
      let atual = agenda;
      while (atual !== null) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${atual.nome}</td>
          <td>${atual.telefone}</td>
          <td>${atual.celular}</td>
          <td>${atual.email}</td>
          <td>${atual.dataAniversario.dia}/${atual.dataAniversario.mes}</td>
          <td><button class="btn-remover" data-nome="${atual.nome}">Remover</button></td>
        `;
        tbody.appendChild(tr);
  
        // Adiciona um evento de clique para remover o contato
        tr.querySelector(".btn-remover").addEventListener("click", function () {
          const nome = this.getAttribute("data-nome");
          agenda = removeContato(agenda, nome);
          listarContatos();
        });
  
        atual = atual.proximo;
      }
    }
  
    // Evento de submissão do formulário para adicionar um novo contato
    document.getElementById("contact-form").addEventListener("submit", adicionarContato);
  
    // Evento de clique para listar os contatos
    document.getElementById("btn-listar").addEventListener("click", function () {
      listarContatos();
    });
  
    // Evento de clique para remover os contatos duplicados
    document.getElementById("btn-remover-duplicados").addEventListener("click", function () {
      agenda = removeDuplicados(agenda);
      listarContatos();
    });
  });
  