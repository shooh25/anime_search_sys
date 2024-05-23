import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000",
});


export const getSample = async () => {
  return await client.get("/sample").then((res) => {
    return res.data
  });
};

export const searchWithImage = async (data: FormData) => {
  return await client.post('/image', data, {
    headers: {
      'content-type': 'multipart/form-data',
    }
  }).then((res) => {
    // console.log(res.data)
    return res.data
  })
}
