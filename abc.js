import fetch from "node-fetch"

(function () {
    fetch("http://localhost:3010/abc", { 
        method: 'POST', 
        body: JSON.stringify({ a: "AAAAA" }), 
        headers: {
           "Content-Type": "application/json"
        }
    })
})()