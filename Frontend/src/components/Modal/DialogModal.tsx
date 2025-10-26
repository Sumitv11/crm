import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react"; // Import ReactNode type

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: ReactNode;
  formId?: string; // Optional formId prop
  isLoading?: boolean; // Optional loading state for the "Save" button
  width?: string; // Optional width prop
  height?: string; // Optional height prop
  showCloseButton?: boolean; // Optional prop to show/hide Close button
  showSaveButton?: boolean; // Optional prop to show/hide Save button
}

const CustomModal = ({
  isOpen,
  onClose,
  dialogTitle = "Dialog Title",
  dialogDescription = "Dialog Description",
  children,
  formId,
  width,
  height,
  showCloseButton = true, // Default is true
  showSaveButton = true, // Default is true
}: CustomModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${width} ${height} `}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="modal-body">{children}</div>
        <DialogFooter className="sm:justify-start">
          {showCloseButton && (
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={onClose}>
                Close
              </Button>
            </DialogClose>
          )}
          {showSaveButton && formId && (
            <Button form={formId} type="submit">
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CustomModal;
