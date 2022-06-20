const CallAPI = (code) => fetch(`https://v6.exchangerate-api.com/v6/eb365837ff350374f3ee2d3d/latest/${code}`).then(response => response.json())

CallAPI("USD").then(
    response => {
        Object.keys(response.conversion_rates).map((key) => {
            let option = document.createElement("option");
            option.setAttribute("value", key);
            option.innerHTML = key;
            document.querySelector(".moeda-de-origem-input").appendChild(option);
        })
        Object.keys(response.conversion_rates).map((key) => {
            let option = document.createElement("option");
            option.setAttribute("value", key);
            option.innerHTML = key;
            document.querySelector(".moeda-de-destino-input").appendChild(option);
        })
    }
)

const ExchangeCalculate = () => {
    ShowWarning("Carregando...")
    let valor_de_origem = document.querySelector(".valor-de-origem-input").value.replace(",",".");
    let moeda_de_origem = document.querySelector(".moeda-de-origem-input").selectedOptions[0].value;
    let moeda_de_destino = document.querySelector(".moeda-de-destino-input").selectedOptions[0].value;

    if (valor_de_origem !== '') {
        CallAPI(moeda_de_origem).then(
            response => {
                for(item in response.conversion_rates) {
                    if (item == moeda_de_destino) {
                        let valor_de_destino = valor_de_origem * response.conversion_rates[item];
                        document.querySelector(".valor-de-destino").innerHTML = `${String(valor_de_destino.toFixed(2)).replace(".",",")}`;
                        ShowWarning("Calcular")
                    }
                }
            }
        )
        .catch(
            setTimeout(() => {
                ShowWarning("Calcular");
            }, 1500),
        )
    }
    else {
        setTimeout(() => {
            ShowWarning("Calcular");
        }, 1500)
    }
}

const reverseExchange = () => {
    let moeda_de_origem = document.querySelector(".moeda-de-origem-input").selectedOptions[0].value;
    let moeda_de_destino = document.querySelector(".moeda-de-destino-input").selectedOptions[0].value;
    document.querySelector(".moeda-de-origem-input").value = moeda_de_destino
    document.querySelector(".moeda-de-destino-input").value = moeda_de_origem
}

const ShowWarning = (msg) => {
    document.querySelector(".botao-converter p").innerHTML = msg;
}

const cleanMessage = () => {
    document.querySelector(".valor-de-destino").innerHTML = 'O valor aparecerá aqui.';
    document.querySelector(".valor-de-origem-input").value = '';
    document.querySelector('.moeda-de-origem-input').value = "none";
    document.querySelector('.moeda-de-destino-input').value = "none";
}

const cleanMessageOpenner = () => {
    let message = document.querySelector(".valor-de-destino").firstChild.nodeValue;
    
    if (message == 'O valor aparecerá aqui.') {
        document.querySelector(".clean-message").classList.remove("clean-message-open");
    }
    else {
        document.querySelector(".clean-message").classList.add("clean-message-open");   
    }
}

setInterval(cleanMessageOpenner, 200)




