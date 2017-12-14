// Learn about API authentication here: https://plot.ly/nodejs/getting-started
// Find your api_key here: https://plot.ly/settings/api

var plotly = require('plotly')("nredd", "pf7EAgctGzGCzpR8TAEu");
var data = [
    {

        x: x,
        y: y,
        type: "scatter"
    }
];
var graphOptions = {filename: "date-axes", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});