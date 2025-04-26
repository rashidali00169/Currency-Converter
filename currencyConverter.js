import https from "https";
import readline from "readline";
// import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const apiKey = "2325c86ce646e33e969ea4da";
const url = `https://v6.exchangerate-api.com/v6/2325c86ce646e33e969ea4da/latest/USD`;

const convertCurrency = (amount, rate) => {
    return (amount *  rate).toFixed(2);
}

https.get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
        data += chunk;
    });

    response.on("end", () => {
        const rates = JSON.parse(data).conversion_rates;


        rl.question("Enter the amount in USD: ", (amount) => {
            rl.question("Enter the target currency (e.g, PKR, INR, EUR): ", (currency) => {
                const rate = rates[currency.toUpperCase()];
                
                if (rate) {
                    console.log(`${amount} USD is approximately ${convertCurrency(amount, rate)} ${currency}`);
                } else {
                    console.log("Invalid currency code");
                }
                rl.close();
            })
        })

    })
})