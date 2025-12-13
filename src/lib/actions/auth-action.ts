"use server";

import { redirect } from "next/navigation";
import { SignUpResponse } from "../types/auth";
import z from "zod";
import { headers } from "next/headers";
import { signUpSchema as signShema } from "../schemes/zod.schema";
import { getToken } from "../utils/get-token";
import { ServerError } from "../types/data";
import { ChangePasswordInfo } from "../types/data";
type SignUpData = z.infer<typeof signShema>;

// Sign Up Action
export async function signUpAction(userData: SignUpData) {
  const data = { ...userData, phone: userData.phone.slice(2) };

  const response = await fetch(`${process.env.API}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: ApiResponse<SignUpResponse> = await response.json();
  if ("code" in result) {
    return {
      success: false,
      message: result.message,
    };
  }

  return {
    success: true,
    message: result.message,
  };
}

// Forget Password Action
export async function forgetPasswordAction(email: string) {
  const response = await fetch(`${process.env.API}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    redirect("/auth/forget-password?error=Invalid Email");
  }

  redirect(`/auth/verification?email=${email}`);
}

// Verification Action
export async function verificationAction(code: string) {
  const headerList = headers();
  const fullUrl = headerList.get("referer") as string;
  const url = new URL(fullUrl);
  const email = url.searchParams.get("email");

  if (code.length === 6 && email) {
    const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
      method: "POST",
      body: JSON.stringify({
        resetCode: code,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        code: 401,
        message: result.message,
      };
    } else {
      redirect(`/auth/reset-password?email=${email}`);
    }
  }
}

// Reset Password Action
export async function resetPasswordAction(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify({
      email: data.email,
      newPassword: data.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return redirect(
      `/auth/forget-password?email=${data.email}&error=Something went wrong`
    );
  }

  return redirect(`/auth/login`);
}

// Update Profile Action
export async function updateProfileAction(userData: Partial<SignUpData>) {
  const token = await getToken();
  const data =
    "phone" in userData
      ? { ...userData, phone: userData.phone?.slice(2) }
      : userData;

  const response = await fetch(`${process.env.API}/auth/editProfile`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      token: `${token?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const result: ApiResponse<SignUpResponse> = await response.json();

  if ("code" in result) {
    return {
      success: false,
      message: result.message,
    };
  }
  return {
    success: true,
    message: result.message,
  };
}

// Get User Info
export async function getUserAction() {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/auth/profileData`, {
    headers: {
      token: `${token?.accessToken}`,
    },
  });

  const result = await response.json();
  return result;
}

// Delete Account Action
export async function deleteAccountAction() {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/auth/deleteMe`, {
    method: "DELETE",
    headers: {
      token: `${token?.accessToken}`,
    },
  });

  if (!response.ok) {
    throw {
      code: 401,
      message: "Something went wrong please try again later",
    } satisfies ServerError;
  }

  const result = await response.json();

  if ("code" in result) {
    throw {
      code: result.code,
      message: result.message,
    } satisfies ServerError;
  }
}
// Change Password Action
export async function changePasswordAction(data: ChangePasswordInfo) {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/auth/changePassword`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      token: `${token?.accessToken}`,
    },
  });
  const result = await response.json();

  return result;
}
