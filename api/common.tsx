import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-13-115-61-236.ap-northeast-1.compute.amazonaws.com:3000",
  headers: {
    "Content-type": "application/json",
  },
});
