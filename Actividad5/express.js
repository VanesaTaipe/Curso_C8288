import { routeHello, routeAPINames } from "./route.js"; 
import express from "express"; 
const server = express(); 
// Cambia aquí el número de puerto 
const port = 8080;  // Por ejemplo, cambia de 3000 a 8080 
server.get("/hello", function (req, res) { 
    const response = routeHello(req, res); 
    res.send(response); 
}); 
server.get("/api/names", async function (req, res) { 
    let response; 
    try { 
        response = await routeAPINames(req, res); 
    } catch (err) { 
        console.log(err); 
    } 
    res.send(response); 
}); 
server.listen(port, function () { 
    console.log("Listening on " + port); 
 
});
