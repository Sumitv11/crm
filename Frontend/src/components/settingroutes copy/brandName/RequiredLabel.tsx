import { Label } from "@radix-ui/react-dropdown-menu";

export const RequiredLabel = ({ text }: { text: string }) => (
    <Label className="text-red-500 text-sm">
      {text} <span className="text-red-500">*</span>
    </Label>
  );
  