console.log("App.js funcionando");


const API = "http://localhost:3000/alunos";

async function listarAlunos() {
    const resposta = await fetch(API);
    console.log(resposta)
    const alunos = await resposta.json();
    console.log(alunos)
    const tabela = document.getElementById("tbody");

    tabela.innerHTML = "";

    alunos.forEach(aluno => {
        tabela.innerHTML += `<tr>
            <td>${aluno.id}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.curso}</td>
            <td> <button class="btn-editar">Editar</button>
                <button class="btn-excluir">Excluir</button>
            </td>
        </tr>
        `
    });

}

async function cadastraAluno() {
    const nome = document.getElementById("nome").value;
    const curso = document.getElementById("curso").value;

    if (nome === "" || curso === "") {
        alert("Preencha nome e curso");
        return;
    }

    await fetch(`${API}/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            curso: curso
        })


    });
    document.getElementById("nome").value = "";
    document.getElementById("curso").value = "";
    listarAlunos();
}

listarAlunos()