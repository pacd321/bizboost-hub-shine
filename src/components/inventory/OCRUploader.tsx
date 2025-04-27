
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface OCRUploaderProps {
  onSuccess?: (data: any) => void;
}

export function OCRUploader({ onSuccess }: OCRUploaderProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file first.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setIsProcessing(true);
      
      // Simulate OCR processing
      setTimeout(() => {
        setIsProcessing(false);
        setUploadComplete(true);
        
        toast({
          title: "Invoice Processed Successfully",
          description: "The invoice details have been extracted and added to your inventory."
        });
        
        if (onSuccess) {
          // Mock extracted data
          const mockExtractedData = {
            vendor: "Supplier Ltd",
            invoiceNumber: "INV-2023-875",
            date: new Date().toISOString(),
            items: [
              { name: "Product XYZ", quantity: 10, price: 1499, total: 14990 },
              { name: "Service ABC", quantity: 1, price: 5000, total: 5000 }
            ],
            totalAmount: 19990
          };
          onSuccess(mockExtractedData);
        }
      }, 2000);
    }, 1500);
  };

  const handleReset = () => {
    setFile(null);
    setUploadComplete(false);
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {!uploadComplete ? (
            <>
              <div className="p-6 rounded-full bg-muted/50">
                <Upload className="h-10 w-10 text-muted-foreground" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Upload Invoice or Receipt</h3>
                <p className="text-sm text-muted-foreground">
                  Upload an image of your invoice or receipt, and we'll automatically extract the product details
                </p>
              </div>
              
              <div className="w-full max-w-sm space-y-4">
                <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => document.getElementById('file-upload')?.click()}>
                  <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm">
                    {file ? file.name : "Click to select file or drag and drop"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports JPG, PNG, PDF (max 10MB)
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/jpeg,image/png,application/pdf"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleUpload}
                    disabled={!file || isUploading || isProcessing}
                    className="w-full">
                    {isUploading && "Uploading..."}
                    {isProcessing && "Processing..."}
                    {!isUploading && !isProcessing && "Extract Data"}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-6 rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Processing Complete</h3>
                <p className="text-sm text-muted-foreground">
                  We've successfully extracted the details from your document
                </p>
              </div>
              
              <Button onClick={handleReset}>
                Upload Another Document
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
