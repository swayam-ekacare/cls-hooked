import fetch from "node-fetch"

(function () {
    const req1 = fetch("http://localhost:3010/abc", { 
        method: 'POST', 
        body: JSON.stringify({ a: "This is the request body" }), 
        headers: {
           "Content-Type": "application/json"
        }
    })

    const req2 = fetch("http://localhost:3010/abc")

    const allData = Promise.all([req1, req2])

    allData.then((res) => console.log(res));
})()