
import React, { useState } from "react";
import { PatientPortal } from "@/components/PatientPortal";
import { DoctorPortal } from "@/components/DoctorPortal";
import { AdminPortal } from "@/components/AdminPortal";
import { PortalSwitcher } from "@/components/PortalSwitcher";

type PortalType = "patient" | "doctor" | "admin";

const Index = () => {
  const [currentPortal, setCurrentPortal] = useState<PortalType>("patient");

  const renderPortal = () => {
    switch (currentPortal) {
      case "patient":
        return <PatientPortal />;
      case "doctor":
        return <DoctorPortal />;
      case "admin":
        return <AdminPortal />;
      default:
        return <PatientPortal />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <PortalSwitcher
        onSelectPortal={setCurrentPortal}
        currentPortal={currentPortal}
      />
      {renderPortal()}
    </div>
  );
};

export default Index;
