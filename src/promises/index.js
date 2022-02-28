// Promesas
import * as https from "https";
import { URL_API } from "../utils/urlApi.js";

// Función que retorna información de R&M
export const fetchData = (urlApi) => {
  return new Promise((resolve, reject) => {
    https.get(urlApi, (res) => {
      res.setEncoding("utf8");
      if (res.statusCode === 200) {
        let body = "";
        res.on("data", (data) => {
          body += data;
        });
        res.on("end", () => {
          resolve(JSON.parse(body));
        });
      } else
        reject(new Error(`REQUEST ERROR ON ${url}. Status ${res.statusCode}`));
    });
  });
};

fetchData(URL_API)
  .then((data) => {
    console.log(data["info"]["count"]);
    return fetchData(`${URL_API}${data.results[0].id}`);
  })
  .then((data) => {
    console.log(data["name"]);
    return fetchData(data.origin.url);
  })
  .then((data) => {
    console.log(data.dimension);
  })
  .catch((error) => console.log(error));
