"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<"input"> & { checked?: boolean; onCheckedChange?: (checked: boolean) => void }) {
  const { checked, onCheckedChange, disabled, ...rest } = props
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      onClick={() => onCheckedChange?.(!checked)}
      {...(rest as React.ComponentProps<"button">)}
    >
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
    </button>
  )
}

export { Checkbox }
