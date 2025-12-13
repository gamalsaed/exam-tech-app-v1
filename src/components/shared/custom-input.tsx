import React, { forwardRef, type ComponentPropsWithRef } from "react";
import ValidationError from "./validation-error";
import { Input } from "@/components/ui/input";
type InputProps = {
  label: string;
  name: string;
  type: string;
  className?: string;
  children?: React.ReactNode;
  errorMessage?: string | undefined;
} & ComponentPropsWithRef<"input">;

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  function CustomInput(
    { label, errorMessage, name, children, type, className, ...props },
    ref
  ) {
    return (
      <div className="w-full flex flex-col gap-1 p-1 font-mono">
        <label
          htmlFor={name}
          className="text-base mb-1 font-medium text-gray-800"
        >
          {label}
        </label>

        <div className="relative">
          <Input
            id={name}
            name={name}
            type={type}
            {...props}
            className={`ring-[2px] ring-gray-200 focus:ring-blue-600 ${
              errorMessage && " ring-red-400"
            } ${className}`}
            ref={ref}
          />
          {children}
        </div>
        
        {/* Validation Error */}
        {errorMessage && <ValidationError message={errorMessage} />}
      </div>
    );
  }
);
export default CustomInput;
