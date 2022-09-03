import axios from "axios";

import {getEnvBaseApiUrl} from "@lib/env";


const http = axios.create({
  baseURL: getEnvBaseApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});


export default http;


