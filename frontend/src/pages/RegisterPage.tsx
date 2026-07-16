import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { registerSchema } from "../lib/auth.schema";
import type { RegisterFormData } from "../lib/auth.schema";

import { registerUser } from "../api/auth.api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);

      toast.success("Registration successful!");

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <div>
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
          />
          <p className="text-red-500 text-sm">
            {errors.name?.message}
          </p>
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border rounded-lg p-3"
          />
          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full border rounded-lg p-3"
          />
          <p className="text-red-500 text-sm">
            {errors.password?.message}
          </p>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-black text-white rounded-lg py-3"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}