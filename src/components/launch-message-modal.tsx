"use client";

import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LaunchMessageModalProps {
  message?: string;
}

const LaunchMessageModal: React.FC<LaunchMessageModalProps> = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (message) {
      // Check if the message has been shown before in this session
      const messageShown = sessionStorage.getItem('launchMessageShown');
      if (!messageShown) {
        setIsOpen(true);
        sessionStorage.setItem('launchMessageShown', 'true');
      }
    }
  }, [message]);

  if (!message || !isOpen) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome!</AlertDialogTitle>
          <AlertDialogDescription className="font-body">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setIsOpen(false)}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LaunchMessageModal;
