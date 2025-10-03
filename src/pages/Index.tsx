import { useState, useCallback } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImagePreview } from "@/components/ImagePreview";
import { ResizeControls, ResizeOptions } from "@/components/ResizeControls";
import { ProcessedImages } from "@/components/ProcessedImages";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";

interface UploadedImage {
  file: File;
  preview: string;
}

interface ProcessedImage {
  name: string;
  url: string;
  size: number;
}

const Index = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState<ResizeOptions>({
    width: 800,
    height: 600,
    format: "jpeg",
    quality: 85,
    maintainAspectRatio: true,
  });

  const handleImagesSelected = useCallback((files: File[]) => {
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
    toast.success(`${files.length} image(s) added`);
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setUploadedImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    setUploadedImages([]);
    setProcessedImages([]);
    toast.success("All images cleared");
  }, [uploadedImages]);

  const processImages = async () => {
    if (uploadedImages.length === 0) return;

    setProcessing(true);
    const processed: ProcessedImage[] = [];

    try {
      for (const image of uploadedImages) {
        const processedImage = await resizeImage(image.file, options);
        processed.push(processedImage);
      }

      setProcessedImages(processed);
      toast.success(`Successfully processed ${processed.length} image(s)`);
    } catch (error) {
      toast.error("Error processing images");
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const resizeImage = (file: File, opts: ResizeOptions): Promise<ProcessedImage> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        canvas.width = opts.width;
        canvas.height = opts.height;

        ctx.drawImage(img, 0, 0, opts.width, opts.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not create blob"));
              return;
            }

            const url = URL.createObjectURL(blob);
            const extension = opts.format === "jpeg" ? "jpg" : opts.format;
            const name = file.name.replace(/\.[^/.]+$/, "") + `_resized.${extension}`;

            resolve({
              name,
              url,
              size: blob.size,
            });
          },
          `image/${opts.format}`,
          opts.format === "jpeg" ? opts.quality / 100 : undefined
        );
      };

      img.onerror = () => reject(new Error("Could not load image"));
      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Image Resizer Tool</h1>
              <p className="text-sm text-muted-foreground">
                Batch resize and convert images instantly
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Upload & Preview */}
          <div className="lg:col-span-2 space-y-6">
            <ImageUploader
              onImagesSelected={handleImagesSelected}
              hasImages={uploadedImages.length > 0}
              onClear={handleClearAll}
            />

            {uploadedImages.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Uploaded Images ({uploadedImages.length})
                </h2>
                <ImagePreview images={uploadedImages} onRemove={handleRemoveImage} />
              </div>
            )}

            {processedImages.length > 0 && (
              <div>
                <ProcessedImages images={processedImages} />
              </div>
            )}
          </div>

          {/* Right Column - Controls */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ResizeControls
                options={options}
                onOptionsChange={setOptions}
                onProcess={processImages}
                processing={processing}
                canProcess={uploadedImages.length > 0}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
