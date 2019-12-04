import axios from "axios";
import { DOMAIN } from "../config";

export default axios.create({
  baseURL: DOMAIN
});
