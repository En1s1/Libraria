// INTENTIONALLY VULNERABLE CODEQL TEST
// DO NOT MERGE INTO MAIN

import http from "http";

const testServer = http.createServer((req, res) => {
  const requestUrl = new URL(req.url || "/", "http://localhost");
  const target = requestUrl.searchParams.get("target");

  // User input is used directly inside an outgoing request URL.
  http.get("https://" + target + ".example.com/data", (response) => {
    response.pipe(res);
  });
});

export default testServer;