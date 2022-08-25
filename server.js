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

    function redirectTo(urlPath) {
        res.statusCode = 302;
        res.setHeader('Location', urlPath);
        return res.end();
    }

    req.on('end', async () => {

        if (req.method === "GET" && req.url === "/") {
            const htmlFile = fs.readFileSync("./vews/index.html", "utf-8");
            const resBody = htmlFile
                .replace(/#{quote}/g, `Click below for your first quote`);
            
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.write(resBody);
            return res.end();
        }

        if (req.method === "POST" && req.url === "/quote") {
            const quote = await getQuote();
            const text = quote.text;
            const author = quote.author;

            if (quote) {
                const htmlFile = fs.readFileSync("./views/index.html", "utf-8");
                let reqBody = htmlFile
                    .replace(/#{quote}/g, `"${text}" - ${author}`);

                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/html");
                    res.write(reqBody);
                    return res.end();
            } else {
                return redirectTo('/');
            }
        }
    })
})

const port = 5000;

server.listen(port, () => console.log(`Server listening on port ${port}...`));