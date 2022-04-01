import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.1.146/admin/",
    headers: {
        "Content-type": "application/json",
    },
});

export const url = "http://192.168.1.146/admin/";