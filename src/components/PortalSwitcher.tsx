
import React from "react";
import { Button } from "@/packages/ui-kit";

interface PortalSwitcherProps {
  onSelectPortal: (portal: "patient" | "doctor" | "admin") => void;
  currentPortal: "patient" | "doctor" | "admin";
}

export function PortalSwitcher({ onSelectPortal, currentPortal }: PortalSwitcherProps) {
  return (
    <div className="bg-health-primary text-white p-3 flex justify-center items-center space-x-4">
      <Button
        variant={currentPortal === "patient" ? "secondary" : "ghost"}
        className="text-white hover:bg-white/20"
        onClick={() => onSelectPortal("patient")}
      >
        Patient Portal
      </Button>
      <Button
        variant={currentPortal === "doctor" ? "secondary" : "ghost"}
        className="text-white hover:bg-white/20"
        onClick={() => onSelectPortal("doctor")}
      >
        Doctor Portal
      </Button>
      <Button
        variant={currentPortal === "admin" ? "secondary" : "ghost"}
        className="text-white hover:bg-white/20"
        onClick={() => onSelectPortal("admin")}
      >
        Admin Portal
      </Button>
    </div>
  );
}
