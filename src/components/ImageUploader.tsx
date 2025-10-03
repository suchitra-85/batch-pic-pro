import { Upload, X } from "lucide-react";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  hasImages: boolean;
  onClear: () => void;
}

export const ImageUploader = ({ onImagesSelected, hasImages, onClear }: ImageUploaderProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (files.length > 0) {
        onImagesSelected(files);
      }
    },
    [onImagesSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onImagesSelected(files);
      }
    },
    [onImagesSelected]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="relative">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-12 text-center transition-all",
          "hover:border-primary hover:bg-primary/5 cursor-pointer",
          "border-border bg-card",
          hasImages && "opacity-50"
        )}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
            <Upload className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop images here or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports: JPG, PNG, WEBP, GIF
            </p>
          </div>
        </div>
      </div>
      {hasImages && (
        <button
          onClick={onClear}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
