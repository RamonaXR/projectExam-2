import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../utils/authApi";

/**
 * Custom hook to handle user login.
 *
 * This hook leverages react-query's useMutation to execute the login API call via `loginApi`.
 * It returns a mutation object that includes methods and state for performing the login operation.
 *
 * @returns {object} The mutation object from useMutation, which includes properties such as mutate, isLoading, isError, error, etc.
 *
 * @example
 * const { mutate: login, isLoading, isError, error } = useLogin();
 *
 * // To perform a login:
 * login({ email: 'user@example.com', password: 'password123' });
 */
export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
  });
}
