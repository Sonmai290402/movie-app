import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  // signup: async (credentials) => {
  //   set({ isSigningUp: true });
  //   try {
  //     // const { signUp } = useSignUp();
  //     await signUp.create({
  //       emailAddress: credentials.email,
  //       password: credentials.password,
  //       username: credentials.username,
  //     });
  //     await signUp.prepareEmailAddressVerification();
  //     toast.success("Verification email sent!");
  //     set({ isSigningUp: false });
  //     toast.success("Account created successfully");
  //   } catch (error) {
  //     toast.error(error.response.data.message || "Signup failed");
  //     set({ isSigningUp: false, user: null });
  //   }
  // },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },
  logout: () => set({ user: null }),
}));
