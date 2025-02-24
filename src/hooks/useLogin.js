import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../utils/authApi";

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
  });
}
