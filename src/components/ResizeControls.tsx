import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Download, Settings } from "lucide-react";

export interface ResizeOptions {
  width: number;
  height: number;
  format: "jpeg" | "png" | "webp";
  quality: number;
  maintainAspectRatio: boolean;
}

interface ResizeControlsProps {
  options: ResizeOptions;
  onOptionsChange: (options: ResizeOptions) => void;
  onProcess: () => void;
  processing: boolean;
  canProcess: boolean;
}

export const ResizeControls = ({
  options,
  onOptionsChange,
  onProcess,
  processing,
  canProcess,
}: ResizeControlsProps) => {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Resize Settings</h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              value={options.width}
              onChange={(e) =>
                onOptionsChange({ ...options, width: parseInt(e.target.value) || 0 })
              }
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              value={options.height}
              onChange={(e) =>
                onOptionsChange({ ...options, height: parseInt(e.target.value) || 0 })
              }
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="format">Output Format</Label>
          <Select
            value={options.format}
            onValueChange={(value: "jpeg" | "png" | "webp") =>
              onOptionsChange({ ...options, format: value })
            }
          >
            <SelectTrigger id="format" className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {options.format === "jpeg" && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Quality</Label>
              <span className="text-sm text-muted-foreground">{options.quality}%</span>
            </div>
            <Slider
              value={[options.quality]}
              onValueChange={([value]) => onOptionsChange({ ...options, quality: value })}
              min={10}
              max={100}
              step={5}
              className="mt-1.5"
            />
          </div>
        )}

        <Button
          onClick={onProcess}
          disabled={!canProcess || processing}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          {processing ? "Processing..." : "Process Images"}
        </Button>
      </div>
    </Card>
  );
};
