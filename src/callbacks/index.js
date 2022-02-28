// Importamos HTTPS
import * as https from "https";
import { URL_API } from "../utils/urlApi.js";

// Función que retorna información de R&M
const fetchData = (urlApi, callback) => {
  https.get(urlApi, (res) => {
    res.setEncoding("utf8");
    if (res.statusCode === 200) {
      let body = "";
      res.on("data", (data) => {
        body += data;
      });
      res.on("end", () => {
        callback(null, JSON.parse(body)); // (error, data)
      });
    } else {
      const error = new Error("Error " + urlApi);
      return callback(error, null);
    }
  });
};

fetchData(URL_API, (errorOne, dataOne) => {
  if (errorOne) return console.error(errorOne);
  fetchData(URL_API + dataOne.results[0]["id"], (errorTwo, dataTwo) => {
    if (errorTwo) return console.error(errorTwo);
    fetchData(dataTwo["origin"]["url"], (errorThree, dataThree) => {
      if (errorThree) return console.error(errorThree);
      console.log(dataOne["info"]["count"]);
      console.log(dataTwo["name"]);
      console.log(dataThree["dimension"]);
    });
  });
});
