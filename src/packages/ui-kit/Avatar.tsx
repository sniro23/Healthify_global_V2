
import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "busy" | "away";
}

const statusColorMap = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
  away: "bg-yellow-500",
};

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function Avatar({
  className,
  src,
  alt = "Avatar",
  size = "md",
  status,
  ...props
}: AvatarProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <div
        className={cn(
          "rounded-full overflow-hidden bg-muted flex items-center justify-center",
          sizeMap[size]
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-lg font-medium text-gray-500">
            {alt?.substring(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white",
            statusColorMap[status]
          )}
        />
      )}
    </div>
  );
}
