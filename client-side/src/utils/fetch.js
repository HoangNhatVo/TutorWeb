// import { DOMAIN } from "../config";

// export async function post(url, data) {
//   const response = await fetch(`${DOMAIN}${url}`, {
//     method: "POST",
//     headers: new Headers(),
//     body: JSON.stringify(data)
//   });

//   const body = await response.text();
//   return body;
// }

// export function get(url) {
//   return new Promise((resolve, reject) => {
//     fetch(`${DOMAIN}${url}`)
//       .then(response => response.json())
//       .then(data => resolve(data))
//       .catch(err => reject(err));
//   });
// }
