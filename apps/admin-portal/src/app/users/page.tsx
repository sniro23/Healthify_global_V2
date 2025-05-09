import UserManagement from "@/components/users/UserManagement";

export const metadata = {
  title: "User Management | Healthify",
  description: "Manage users, doctors, and administrators",
};

export default function UsersPage() {
  return <UserManagement />;
} 