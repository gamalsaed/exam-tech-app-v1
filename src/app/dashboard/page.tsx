import React from "react";
import Subjects from "@/components/layout/dashboard/subjects";
import { getToken } from "@/lib/utils/get-token";
import ServerErrorMessage from "@/components/shared/server-error-message";
import { SubjecstResponse } from "@/lib/types/data";

export default async function page() {
  const jwt = await getToken();
  const response = await fetch(`https://exam.elevateegy.com/api/v1/subjects`, {
    headers: {
      token: jwt?.accessToken!,
    },
    cache: "force-cache", // Because subjects are a static thing but the exams are dynamic
  });

  if (!response.ok) {
    return (
      <div>
        <ServerErrorMessage message="Something went wrong" />;
      </div>
    );
  }

  const data: SubjecstResponse = await response.json();

  return (
    <div className="bg-white p-6">
      <Subjects subjects={data.subjects} />
    </div>
  );
}
