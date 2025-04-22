
import React from "react";
import ProfileInfo from "./ProfileInfo";
import { User } from "lucide-react";

const user = {
  name: "John Doe",
  dob: "January 15th, 1980",
  gender: "Male",
  phone: "+1 555-010-2025",
  email: "john.doe@email.com",
  address: "100 Main St, Cityville, 12345",
  insurance: "Health Plus Coverage",
};

const Profile = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <User className="h-6 w-6 text-health-primary" />
      Profile
    </h2>
    <ProfileInfo user={user} />
  </div>
);

export default Profile;
