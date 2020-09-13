import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "0443f1d2f546d7eda5346f44b92443a3",
  },
});
