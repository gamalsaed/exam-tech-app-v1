import LoginForm from "@/components/layout/auth/login-form";
import Link from "next/link";
export default function page() {
  return (
    <div className="w-2/4 h-full flex justify-center items-center flex-col gap-8 max-md:w-full">
      <LoginForm />
      <p className="font-mono">
        Don’t have an account?{" "}
        <Link href="signup" className="text-blue-600">
          Create yours
        </Link>
      </p>
    </div>
  );
}
