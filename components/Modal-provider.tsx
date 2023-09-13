"use client";

import { useEffect, useState } from "react";
import ProModal from "@/components/Pro-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      <ProModal />
    </>
  );
};

export default ModalProvider;
