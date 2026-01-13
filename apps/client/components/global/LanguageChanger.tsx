"use client";

import { Button } from "@workspace/ui/components/button";
import { Globe } from "lucide-react";
import LanguageModal from "../modals/LanguageModal";

export default function LanguageChanger() {
  return (
    <LanguageModal>
      <Button variant="secondary" size="icon">
        <Globe />
      </Button>
    </LanguageModal>
  );
}
