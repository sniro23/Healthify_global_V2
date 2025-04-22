
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/packages/ui-kit";

interface UserInfo {
  name: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
}

const ProfileInfo: React.FC<{ user: UserInfo }> = ({ user }) => (
  <Card className="max-w-xl">
    <CardHeader>
      <CardTitle className="text-lg">{user.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        <ProfileInfoRow label="Date of Birth" value={user.dob} />
        <ProfileInfoRow label="Gender" value={user.gender} />
        <ProfileInfoRow label="Phone" value={user.phone} />
        <ProfileInfoRow label="Email" value={user.email} />
        <ProfileInfoRow label="Address" value={user.address} />
        <ProfileInfoRow label="Insurance" value={user.insurance} />
      </div>
    </CardContent>
  </Card>
);

const ProfileInfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="text-xs text-gray-500">{label}</div>
    <div className="font-medium">{value}</div>
  </div>
);

export default ProfileInfo;
