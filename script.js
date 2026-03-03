let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let editandoIndex = null;

const form = document.getElementById('userForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const telefone = telefoneInput.value.trim();

    if (!nome || !email || !telefone) {
        alert("Preencha todos os campos");
        return;
    }
    if (editandoIndex !==null ) {
        usuarios[editandoIndex] = {nome, email, telefone}; 
        editandoIndex = null;

    } else {
        usuarios.push({ nome, email, telefone });
    }
    

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    const form = document.getElementById('userForm');

    form.reset();
    renderizar();
});

function renderizar() {
    const lista = document.getElementById('userList');
    lista.innerHTML = '';

    usuarios.forEach((user, index) => {
        lista.innerHTML += `
        <tr id="linha-${index}">
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.telefone}</td>
            <td>
                <button onclick="editar(${index})">Editar</button>
                <button onclick="excluir(${index})">Excluir</button>
            </td>
        </tr>
        `;
    });
}

function editar(index){ 
            const linha = document.querySelectorAll("#userList tr")[index];
            const usuario = usuarios[index];

            linha.innerHTML = `
        <td><input type="text" value="${usuario.nome}" id="editNome"></td>
        <td><input type="email" value="${usuario.email}" id="editEmail"></td>
        <td><input type="tel" value="${usuario.telefone}" id="editTelefone"></td>
        <td>
            <td>
                    <button onclick="salvarEdicao(${index})">Salvar</button>
                </td>
            `;

        
        }
function salvarEdicao(index) {
    const novoNome = document.getElementById("editNome").value.trim();
    const novoEmail = document.getElementById("editEmail").value.trim();
    const novoTelefone = document.getElementById("editTelefone").value.trim();

     if (!novoNome || !novoEmail || !novoTelefone) {
        alert("Preencha todos os campos");
        return;
    
}

    usuarios[index] = {
        nome: novoNome,
        email: novoEmail,
        telefone: novoTelefone
    };

     localStorage.setItem("usuarios", JSON.stringify(usuarios));
        renderizar();
}

function excluir(index) {
    if (confirm("Excluir usuário?")) {
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderizar();
    }
}

renderizar();