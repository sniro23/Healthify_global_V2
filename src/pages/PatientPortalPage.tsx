
import React from "react";
import { PatientPortal } from "@/components/PatientPortal";
import { Link } from "react-router-dom";
import { Button } from "@/packages/ui-kit";

const PatientPortalPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-health-primary text-white p-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Patient Portal</h1>
        <Link to="/">
          <Button variant="ghost" className="text-white hover:bg-white/20">
            Back to Home
          </Button>
        </Link>
      </div>
      {/* Remove <PatientPortal /> direct call; ensure nested routing works */}
      <div className="flex-1 min-h-0">
        <PatientPortal />
      </div>
    </div>
  );
};

export default PatientPortalPage;
