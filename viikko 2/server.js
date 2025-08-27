function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const responces = {
    '/': () => {
        return { body: "Hello World" };
    },
    '/about': () => {
        return { body: "Tämä on kurssin esimerkkipalvelin." };
    },
    '/hello': () => {
        return { body: "Moi opiskelija!" };
    },
    '/json': () => {
        return { contentType: 'application/json', body: JSON.stringify({ "kurssi": "Noden perusteet" }) };
    },
    '/time': () => {
        d = new Date();
        return { contentType: 'application/json', body: JSON.stringify({ "nyt": d.toString() }) };
    },
    '/random': () => {
        return { contentType: 'application/json', body: JSON.stringify({ "satunnainen_luku": getRandomInt(1, 100) }) };
    },
}

// •	/json → JSON-objekti: { kurssi: 'Noden perusteet' }
// •	/hello → "Moi opiskelija!"
// •	/time → JSON-aikaleima: { nyt: "2025-08-19T..." }
// •	/random → Satunnaisluku 1–100 JSON-muodossa: { satunnainen_luku: 42 }



const DEFAULT_PORT = 3000;
const http = require("http");
const server = http.createServer((req, res) => {
    const send = (status, body, contentType = 'text/plain') => {

        res.writeHead(status, { 'Content-Type': contentType + '; charset=utf-8' });
        res.end(body);
    };
    let { url, method } = req;
    console.log(`${method}: ${url}`);

    let handled = false;
    if (method.toLowerCase() === 'get') {
        url = url.toLowerCase();
        if (responces.hasOwnProperty(url)) {
            const { contentType = 'text/plain', body } = responces[url]();
            send(200, body, contentType);
            handled = true;
        }


    }

    // 
    if (!handled)
        send(404, 'Sivua ei löytynyt');
});


const PORT = process.env.PORT || DEFAULT_PORT;
server.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});