import React from "react";

export default function ValidationError({
  message,
}: {
  message: string | undefined;
}) {
  return (
    <span className="text-sm mt-1 ml-1 font-mono text-red-600">{message}</span>
  );
}
