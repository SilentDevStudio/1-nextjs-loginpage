"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Setting up the validation schema with zod
const loginSchema = z.object({
  email: z.string().email("Type a valid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

// Extracting the Type from the Schema
type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Home() {
  //2. Setting up the Hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // Simulating an API call (e.g., 2 seconds wait)
  const onSubmit = async (data: LoginFormInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Loggedin successfully: ", data);
    alert("Logged in succesfully");
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl h-175">
        <div className="w-2/3 relative hidden md:block">
          <Image
            src="/login-screen-image.jpg"
            alt="Login image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col w-full lg:w-1/3 justify-between px-8 pt-12">
          <div className="mx-auto w-full">
            <div className="mb-12 flex items-center gap-2 text-xl font-semibold">
              <span className="text-gray-800">{"{ }"}</span>
              <span className="antialised text-gray-800">
                Silent Dev Studio
              </span>
            </div>

            <h1 className="antialiased tracking-tight mb-6 text-2xl font-medium text-gray-900">
              Nice to see you again
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="" className="text-gray-500">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className={`w-full bg-gray-100 p-3 text-sm text-gray-600 outline-none transition focus:ring-2 ${
                    errors.email
                      ? "focus:ring-red-400 border border-red-400"
                      : "focus:ring-blue-400"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 p-1 bg-red-100 rounded text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="" className="text-gray-500">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className={`w-full bg-gray-100 p-3 text-sm text-gray-600 outline-none transition focus:ring-2 ${
                    errors.password
                      ? "focus:ring-red-400 border border-red-400"
                      : "focus:ring-blue-400"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 p-1 bg-red-100 rounded text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="text-right">
                <a
                  href="$"
                  className="text-xs text-blue-600 hover:underline transition"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 mb-0 rounded-md bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {
                  isSubmitting ? (
                    <>
                      <Image src="/loading.svg" alt="Loading" className="h-5 w-5 animate-spin" width={20} height={20} />
                      <span className="antialiased">Submitting...</span>
                    </>
                  ) : (
                    "Sign In"
                  )
                }
              </button>

              <div className="my-6 border-t border-gray-200"></div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-zinc-800 py-3 font-medium text-sm text-white transition hover:bg-zinc-900 cursor-pointer"
              >
                <Image
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  width={100}
                  height={100}
                  alt="Google"
                  className="h-4 w-4"
                />
                Or sign in with Google
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don´t have an account? {""}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline transition"
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
