import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../utils/authApi";

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
  });
}
