import api from "../Api";
// import { User } from "types/api-types/user";

export const Login = {
  Enter: async () => {
    try {
      const res = await api.get("/api/v1/login/Mobile", { method: "POST" });
      return res;
    } catch (error: any) {
      console.log(error);
    }
  },
};