const http = require('http');
const fs = require('fs');

const fetchQuote = async () => {
    try {
        const res = await fetch("https://zenquotes.io/api/random");
        const quote = await res.json();
        const text = quote[0].q;
        const author = quote[0].a;
        return {text, author};
    } catch (error) {
        console.error(error);
    }
};

const server = http.createServer((req, res) => {

})

const port = 5000;

server.listen(port, () => console.log(`Server listening on port ${port}...`));