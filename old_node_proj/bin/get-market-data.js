
/*
 * Pull most recent market
 */
function pullMarketInfo() {
    const http = require('https');
    let pricePoint = {};
    http.get('https://www.bitstamp.net/api/ticker/', (res) => {
        const {statusCode} = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        })
        ;
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                let stamp = parseInt(parsedData.timestamp);
                let cost = parseInt(parsedData.ask);
                pricePoint = {x: stamp, y: cost};
            } catch
                (e) {
                console.error(e.message);
            }
        })
        ;
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    })
    ;
    return pricePoint;
}

