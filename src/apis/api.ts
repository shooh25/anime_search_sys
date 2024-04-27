import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
});


export const getSample = async () => {
  return await client.get("/sample").then((res) => {
    return res.data
  });
};

