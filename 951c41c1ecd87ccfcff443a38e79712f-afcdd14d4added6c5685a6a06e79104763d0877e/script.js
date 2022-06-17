let pacotes = []

const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")
        
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()

}

for( field of fields ){
    field.addEventListener("invalid", event => { 
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}


document.querySelector("form")
.addEventListener("submit", event => {
    console.log("enviar o formulário")

    // não vai enviar o formulário
    event.preventDefault()
})

function cadastro() {
    let cidade = document.querySelector('#cidade').value;
    let duracao = document.querySelector('#duracao').value;
    let hospedagem = document.querySelector('#hospedagem').value;
    let valor = document.querySelector('#valor').value;
    let pacote = {
        cidade: cidade,
        duracao: duracao,
        hospedagem: hospedagem,
        valor: valor
    };
    return pacote
}

function cadastrar(pacotes) {
    let pacote = cadastro()
    adicionar(pacotes, pacote)
}

function adicionar(pacotes, pacote) { 
    pacotes.push(pacote);
    mostrar_lista(pacotes)
}

function mostrar_lista(pacotes) {
    let id = 0;
    let tbody = document.querySelector('#tbody');
    for (let pacote of pacotes) {
        let linha = document.createElement('tr')
        let coluna = document.createElement('td')
        let coluna2 = document.createElement('td')
        let coluna3 = document.createElement('td')
        let coluna4 = document.createElement('td')
        let coluna5 = document.createElement('td')
        coluna.innerText = id
        coluna2.innerText = pacote.cidade
        coluna3.innerText = pacote.duracao
        coluna4.innerText = pacote.hospedagem
        coluna5.innerText = pacote.valor
        linha.appendChild(coluna)
        linha.appendChild(coluna2)
        linha.appendChild(coluna3)
        linha.appendChild(coluna4)
        linha.appendChild(coluna5)
        tbody.appendChild(linha)
        id++ ;
    }
}

function listar(pacotes) {
    return pacotes
}

function controlar_lista(pacotes) {
    pacotes = listar(pacotes);
    mostrar_lista(pacotes)
}

