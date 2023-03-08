import { url } from "./config";
const send = async (method) => {
  const getData = await fetch(url + "songs", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await getData.json();
  return data;
};
export const get = () => {
  return send("GET");
};
