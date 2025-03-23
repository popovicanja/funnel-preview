import { useState, useCallback } from "react";

interface UseFileUploadReturn {
  fileName: string | null;
  error: string | null;
  uploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetUpload: () => void;
}

const SUPPORTED_TYPE = "application/json";

export const useJsonUpload = (
  onFileLoaded?: (content: string) => void
): UseFileUploadReturn => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setError(null);

      if (!file) return;

      const fileType = file.type || "";
      if (SUPPORTED_TYPE !== fileType) {
        setError(`Please upload a JSON file`);
        return;
      }

      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          if (onFileLoaded) {
            onFileLoaded(content);
          }
        } catch (err) {
          setError("Error processing file content");
          console.error(err);
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
      };

      reader.readAsText(file);
    },
    [onFileLoaded]
  );

  const resetUpload = useCallback(() => {
    setFileName(null);
    setError(null);
  }, []);

  return {
    fileName,
    error,
    uploadFile,
    resetUpload,
  };
};
