import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div>
      <p>Dashboard Page</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}