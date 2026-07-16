import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { loginUser } from "../api/auth.api";

import { useAuthStore } from "../store/auth.store";

import { loginSchema } from "../lib/auth.schema";
import type { LoginFormData } from "../lib/auth.schema";

export default function LoginPage() {
  const navigate = useNavigate();

  const setToken = useAuthStore(
    (state) => state.setToken
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const response = await loginUser(data);

      setToken(response.data.accessToken);

      toast.success("Welcome!");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-center">
            Login
          </h1>

          <Input
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            type="password"
            label="Password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button isLoading={isSubmitting}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}