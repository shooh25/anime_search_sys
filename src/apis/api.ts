import axios from "axios";
import { PostData } from "../types/type";

const client = axios.create({
  baseURL: "http://localhost:8000",
});

export const getSample = async () => {
  return await client.get("/sample").then((res) => {
    return res.data;
  });
};

export const searchWithImage = async (data: FormData) => {
  return await client
    .post("/image", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const searchWithTags = async (data: PostData) => {
  return await client.post("/tags", data).then((res) => {
    return res.data;
  });
};
