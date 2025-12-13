"use client";

import { useState, forwardRef, type ComponentPropsWithRef } from "react";
import CustomInput from "./custom-input";
import { EyeOff, Eye } from "lucide-react";

type InputProps = {
  label: string;
  name: string;
  error?: boolean;
  className?: string;
  errorMessage?: string;
} & ComponentPropsWithRef<"input">;

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  function PasswordInput(
    { label, name, errorMessage: error, className, ...props },
    ref
  ) {
    const [hidden, setHidden] = useState<boolean>(true);

    return (
      <CustomInput
        type={hidden ? "password" : "text"}
        placeholder="************"
        label={label}
        name={name}
        errorMessage={error || undefined}
        className={className}
        {...props}
        ref={ref}
      >
        <span
          className="text-gray-400 absolute top-1 right-2.5 cursor-pointer "
          onClick={() => setHidden(!hidden)}
        >
          {!hidden ? <EyeOff width={18} /> : <Eye width={18} />}
        </span>
      </CustomInput>
    );
  }
);

export default PasswordInput;
