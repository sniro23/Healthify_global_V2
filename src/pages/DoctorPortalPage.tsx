
import React from "react";
import { DoctorPortal } from "@/components/DoctorPortal";
import { Link } from "react-router-dom";
import { Button } from "@/packages/ui-kit";

const DoctorPortalPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-health-primary text-white p-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Doctor Portal</h1>
        <Link to="/">
          <Button variant="ghost" className="text-white hover:bg-white/20">
            Back to Home
          </Button>
        </Link>
      </div>
      <DoctorPortal />
    </div>
  );
};

export default DoctorPortalPage;
