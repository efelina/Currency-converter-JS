document.addEventListener('DOMContentLoaded', () => {
    currencyForm = document.getElementById('currencyForm');
    inputCurrency = document.getElementById('inputCurrency');
    amount = document.getElementById('amount')
    logo = document.getElementById('logo')

    euro = document.getElementById('euro');
    usd = document.getElementById('usd');
    chf = document.getElementById('chf');


    currencyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let valueToConvert = event.target.elements[0].value;
        let currencyCodeId = event.target.elements[1].value;
        logo.className = "logoChange";
        let code = "";
        switch (currencyCodeId) {
            case "1":
                code = "EUR";
                break;
            case "2":
                code = "USD";
                break;
            case "3":
                code = "CHF";
                break;
        }

        getExchangeRate(code).then(data => {
            let exchangeRate = data.rates[0].mid;
            exchangeCurrency(valueToConvert, exchangeRate);
        })

        setTimeout(function () {
            logo.className = "logo";
        }, 4000)

    })

})

const getExchangeRate = (code) => {
    return fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${code}`)
        .then(resp => resp.json())
        .then(data => data)
}


function exchangeCurrency(valueToConvert, exchangeRate) {
    let exchange = (valueToConvert * exchangeRate).toFixed(2);
    amount.innerText = `${exchange} PLN`;
}

