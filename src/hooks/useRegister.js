import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../utils/authApi";

/**
 * Custom hook to handle user registration.
 *
 * This hook leverages react-query's useMutation to execute the registration API call using the registerApi function.
 * It returns a mutation object that includes properties such as mutate, isLoading, isError, and error,
 * which can be used to manage the registration process.
 *
 * @returns {object} The mutation object from useMutation.
 *
 * @example
 * const { mutate: register, isLoading, isError, error } = useRegister();
 * // To register a new user:
 * register({ email: 'user@example.com', password: 'password', name: 'John Doe' });
 */
export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
  });
}
