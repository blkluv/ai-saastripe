"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const SucceccPage = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="sm:w-[640px] flex flex-col justify-center items-center py-6">
        <h1 className="font-semibold text-lg">성공적으로 결제되었습니다.</h1>
        <Button
          className="mt-4"
          onClick={() => router.replace(window.location.origin + "/dashboard")}
        >
          확인
        </Button>
      </Card>
    </div>
  );
};

export default SucceccPage;
