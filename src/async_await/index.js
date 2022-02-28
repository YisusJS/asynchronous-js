import * as https from "https";
import { URL_API } from "../utils/urlApi.js";

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

const getData = async (URL_API) => {
  try {
    const data = await fetchData(URL_API);
    const character = await fetchData(`${URL_API}${data.results[0].id}`);
    const origin = await fetchData(character.origin.url);

    console.log(data.info.count)
    console.log(character.name)
    console.log(origin.dimension)

    // return {
    //   count: data.info.count,
    //   name: character.name,
    //   dimension: origin.dimension,
    // };
  } catch (error) {
    console.error(error);
  }
};

getData(URL_API)

// console.log(await getData(URL_API));
