import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
getProductData();

async function getProductData() {
    const res = await fetch(
      "https://api-ce.kroger.com/v1/products/?term=milkhttps://api-ce.kroger.com/v1/products?filter.term=milk/",
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLWNlLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoidnl6bG52Y3dSUUZyRzZkWDBzU1pEQT09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJkbGlzaGZvb2RzLWJiYzYzOXZzIiwiZXhwIjoxNzQ5MDU3MzkyLCJpYXQiOjE3NDkwNTU1ODcsImlzcyI6ImFwaS1jZS5rcm9nZXIuY29tIiwic3ViIjoiMDE1MDg4OTItNmUzNC01ZTk4LTkxMGYtYTA2OTM3MDA1MzE1Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3NDkwNTU1OTIzNTMyMzg4MDksImF6cCI6ImRsaXNoZm9vZHMtYmJjNjM5dnMifQ.JLbIqVPQMhemKgYoG5w2RrRri3STle8Ez4C8xxApZu6R8P7zuYNCCsQh1q4szyBNw8lOKi2x5DUV0d2tJtVtfHsN9GOWFSg_nmejzq3IsViCICSToR7JCD4JmRcS4-0mUvzH7u_mo8PXMnfVCG2pHT6mSfaIAJYJ_t557s3Ng2Mbt_5KH4UK8Z0PQb6imyJvWqEfmeFcToDqIQNDu-mhMW5eTFUkarRhfITf-C6rUio4yCr0GX3m_jfdUDGCL4d5iURqH6uNEjaQNfmBU_OFMwvzqHfWAhTtLABrAyhXVVnh1V-M1PcayhFzTwjdrCD9fFdB1AvSBG132aGTUbTQwg",
        },
      }
    );
    const data = await res.text();
    console.log(data);
}
//access-token - eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLWNlLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoidnl6bG52Y3dSUUZyRzZkWDBzU1pEQT09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJkbGlzaGZvb2RzLWJiYzYzOXZzIiwiZXhwIjoxNzQ5MDU2MDY5LCJpYXQiOjE3NDkwNTQyNjQsImlzcyI6ImFwaS1jZS5rcm9nZXIuY29tIiwic3ViIjoiMDE1MDg4OTItNmUzNC01ZTk4LTkxMGYtYTA2OTM3MDA1MzE1Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3NDkwNTQyNjk1MDU1NjQ0NjUsImF6cCI6ImRsaXNoZm9vZHMtYmJjNjM5dnMifQ.evQpwpnOzqGHXMf3Lf7gk2SMuGycaglZ_R3s5oKuED8nya197I7eUNZNu1OnxXvICY6WvkCaQBvcWmt1654cz0HGnbKLBGskxOxESLB4S624tZYFsaSg1K30iKE73mEnKKizMvHVVCyPwP399il_oP8zZdSH3prKmAaG6-OlwsYCy2qNUlFowK-5H3bn82xSJ0KhVcKOS5VH9aSt68vwSomwjYttUKHJfaeE4cjetLBzajqjBZUxn8taRai1P4UF-sGpUR96oeHBlQJh5o5fOaS900R6qBSuifo1TfPlRfLsepfn9fv9PYWL--h1rJO0t2J_Tq4Q3RR4rijcE5IlAA

//"ZGxpc2hmb29kcy1iYmM2Mzl2czpacUdYT3dZOXRCM05MdnltR1N4MWc2TGVyMy1iLW9tOXJBVjcwWG9m"
  
//curl -Method Post 'https://api-ce.kroger.com/v1/connect/oauth2/token' -Headers @{ 'Content-Type' = 'application/x-www-form-urlencoded'; 'Authorization' = 'Basic ZGxpc2hmb29kcy1iYmM2Mzl2czpacUdYT3dZOXRCM05MdnltR1N4MWc2TGVyMy1iLW9tOXJBVjcwWG9m' } -Body 'grant_type=client_credentials'
//curl -Method Post 'https://api-ce.kroger.com/v1/connect/oauth2/token' -Headers @{ 'Content-Type' = 'application/x-www-form-urlencoded'; 'Authorization' = 'Basic ZGxpc2hmb29kcy1iYmM2Mzl2czpacUdYT3dZOXRCM05MdnltR1N4MWc2TGVyMy1iLW9tOXJBVjcwWG9m' } -Body 'grant_type=client_credentials'

// async function refreshToken() {
//     const res = await fetch("https://api-ce.kroger.com/v1/connect/oauth2/token", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             'Authorization': 'Basic ZGxpc2hmb29kcy1iYmM2Mzl2czpacUdYT3dZOXRCM05MdnltR1N4MWc2TGVyMy1iLW9tOXJBVjcwWG9m'
//         },
//         body: {
//             "grant_type": "client_credentials",
//             "scope": "product.compact",

//         },
//     });

//     console.log(res);
// }
// refreshToken()
//     .then(data => console.log(data))
//     .catch(err => console.error("Error fetching token:", err));

// const clientId = "dlishfoods-bbc639vs";
// const clientSecret = 'ZqGXOwY9tB3NLvymGSx1g6Ler3-b-om9rAV70Xof';
// const scope = 'product.compact'; // or whatever scope you need

// const credentials = btoa(`${clientId}:${clientSecret}`); // Base64 encode

// fetch('https://api-ce.kroger.com/v1/connect/oauth2/token', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization': `Basic ${credentials}`,
    
      
//   },
//   body: new URLSearchParams({
//     "grant_type": 'client_credentials',
//     "scope": 'product.compact' //The level of access your application is requesting. Available options can be found on your app page.
//   })
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Access Token:', data.access_token);
// })
// .catch(error => {
//   console.error('Error:', error);
// });