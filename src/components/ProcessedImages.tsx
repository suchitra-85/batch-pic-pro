import { Download, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import JSZip from "jszip";

interface ProcessedImage {
  name: string;
  url: string;
  size: number;
}

interface ProcessedImagesProps {
  images: ProcessedImage[];
}

export const ProcessedImages = ({ images }: ProcessedImagesProps) => {
  const downloadImage = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  const downloadAll = async () => {
    const zip = new JSZip();

    for (const image of images) {
      const response = await fetch(image.url);
      const blob = await response.blob();
      zip.file(image.name, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "resized-images.zip";
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Processed Images ({images.length})</h3>
        <Button onClick={downloadAll} variant="outline" size="sm">
          <Package className="w-4 h-4 mr-2" />
          Download All (ZIP)
        </Button>
      </div>

      <div className="grid gap-3">
        {images.map((image, index) => (
          <Card key={index} className="p-4 flex items-center gap-4 hover:shadow-glow transition-shadow">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{image.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(image.size)}</p>
            </div>
            <Button
              onClick={() => downloadImage(image.url, image.name)}
              size="sm"
              className="bg-gradient-to-r from-accent to-primary text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
