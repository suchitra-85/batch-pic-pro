import { X } from "lucide-react";
import { Card } from "./ui/card";

interface ImagePreviewProps {
  images: Array<{ file: File; preview: string }>;
  onRemove: (index: number) => void;
}

export const ImagePreview = ({ images, onRemove }: ImagePreviewProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <Card
          key={index}
          className="relative group overflow-hidden transition-all hover:shadow-glow"
        >
          <div className="aspect-square">
            <img
              src={image.preview}
              alt={image.file.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => onRemove(index)}
              className="w-10 h-10 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-xs text-white truncate">{image.file.name}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
