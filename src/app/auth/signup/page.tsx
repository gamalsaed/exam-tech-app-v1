import SignUpForm from "@/components/layout/auth/signup-form";
import Link from "next/link";
export default function page() {
  return (
    <div className="w-2/4 h-full flex justify-center items-center flex-col gap-8 max-md:w-full">
      <SignUpForm />
      <p className="font-mono">
        Already have an account?{" "}
        <Link href="login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
}
