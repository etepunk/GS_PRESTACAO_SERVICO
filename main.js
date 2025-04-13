document.addEventListener("DOMContentLoaded", function () {
    // Função genérica para lidar com os formulários
    function handleFormSubmit(formId, mensagemId, modalId, servico) {
        const form = document.getElementById(formId);

        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault(); // Evita o reload da página

                // Captura os valores do formulário
                let nome = document.getElementById(`nome${servico}`).value;
                let email = document.getElementById(`email${servico}`).value;

                // Criar um objeto com os dados do cliente
                let cliente = {
                    nome: nome,
                    email: email,
                    servico: servico
                };

                console.log("Novo cliente cadastrado:", cliente);

                // Salvar no LocalStorage
                let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
                clientes.push(cliente);
                localStorage.setItem("clientes", JSON.stringify(clientes));

                // Exibir mensagem de sucesso
                document.getElementById(mensagemId).classList.remove("d-none");

                // Limpar campos do formulário
                form.reset();
                document.activeElement.blur(); // Remove o foco de qualquer elemento ativo

                // Fechar modal após 2 segundos
                setTimeout(() => {
                    let modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
                    modal.hide();
                }, 2000);
            });
        }
    }

    // Chamada para cada formulário com base nos serviços
    handleFormSubmit("formBancoDados", "mensagemSucessoBancoDados", "modalBancoDados", "BancoDados");
    handleFormSubmit("FormPython", "mensagemSucessoPython", "modalPython", "Python");
    handleFormSubmit("FormInfra", "mensagemSucessoInfra", "modalInfra", "Infra");
    handleFormSubmit("FormAWS", "mensagemSucessoAWS", "modalAWS", "AWS");
});
