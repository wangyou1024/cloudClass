import axios from "axios";

// export const URL = "http://baiyou1024.top:8080/cloud_class-0.0.1-SNAPSHOT";
export const URL = "http://localhost:8080";

export const RealAxios = axios.create({
    baseURL:URL,
    proxy: {
        '/teacher/*': {
            target: URL,//对应后端端口
            secure: false,
            changeOrigin: true
        },
        '/student/*': {
            target: URL,//对应后端端口
            secure: false,
            changeOrigin: true
        },
    }
});
