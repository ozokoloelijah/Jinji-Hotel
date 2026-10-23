import React, { useRef, useState } from 'react';
import { Upload, Camera, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

/**
 * Reads an image file from the user's local device (phone, laptop, desktop),
 * resizes large images cleanly using HTML5 Canvas to prevent localStorage quota issues,
 * and returns the base64 DataURL string.
 */
export const processLocalImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (e.g. JPG, PNG, WEBP, or SVG).');
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        reject(new Error('Failed to read image data'));
        return;
      }

      // Small files or SVGs can be returned directly
      if (file.type === 'image/svg+xml' || file.size < 120 * 1024) {
        resolve(result);
        return;
      }

      // Resize & compress via Canvas for optimal performance & storage safety
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 1400; // ample high-res for retina displays and hero sliders

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(result);
            return;
          }

          if (file.type === 'image/png' && file.size < 800 * 1024) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/png'));
          } else {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.86));
          }
        } catch {
          resolve(result);
        }
      };

      img.onerror = () => resolve(result);
      img.src = result;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

interface DeviceImageUploadButtonProps {
  onImageSelected: (base64Url: string, fileName: string) => void;
  label?: string;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'compact' | 'outline';
  disabled?: boolean;
}

export const DeviceImageUploadButton: React.FC<DeviceImageUploadButtonProps> = ({
  onImageSelected,
  label = 'Choose Picture from Device',
  className = '',
  icon,
  variant = 'primary',
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || isProcessing) return;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const base64 = await processLocalImageFile(file);
      onImageSelected(base64, file.name);
    } catch (err) {
      console.error('Failed to process device image file', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold shadow-md';
      case 'secondary':
        return 'bg-stone-800 hover:bg-stone-750 text-amber-300 border border-amber-500/30';
      case 'outline':
        return 'bg-transparent hover:bg-stone-850 text-stone-200 border border-stone-700 hover:border-amber-500';
      case 'compact':
        return 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] py-1 px-2.5';
      default:
        return 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isProcessing}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm text-xs uppercase tracking-wider transition-all cursor-pointer ${getVariantStyles()} ${
          disabled || isProcessing ? 'opacity-60 cursor-not-allowed' : ''
        } ${className}`}
      >
        {isProcessing ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : icon ? (
          icon
        ) : (
          <Upload className="w-3.5 h-3.5 shrink-0" />
        )}
        <span>{isProcessing ? 'Processing Image...' : label}</span>
      </button>
    </>
  );
};
