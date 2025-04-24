
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center h-56 px-4">
      <AlertTriangle className="h-12 w-12 text-white mb-4" />
      <p className="text-white text-center mb-6">{message}</p>
      <Button onClick={onRetry} variant="outline" className="bg-white hover:bg-gray-100">
        Try Again
      </Button>
    </div>
  );
}
