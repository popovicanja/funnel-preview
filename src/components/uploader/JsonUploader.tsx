import { useJsonUpload } from "../../hooks/useJsonUpload";
import { UploadIcon } from "../common/Icons";

type JsonUploaderProps = {
  onLoaded: (json: string) => void;
};

export const JsonUploader: React.FC<JsonUploaderProps> = ({ onLoaded }) => {
  const { uploadFile, fileName } = useJsonUpload(onLoaded);

  return (
    <label
      htmlFor="json-file-input"
      className="w-full flex flex-col items-center justify-center border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 p-8"
    >
      <UploadIcon />
      <span className="text-sm text-gray-500 text-center">
        Click to upload or drag &amp; drop your json file
      </span>

      <input
        id="json-file-input"
        type="file"
        className="hidden"
        accept=".json,application/json"
        onChange={uploadFile}
      />
      {fileName && (
        <span className="mt-2 text-sm text-green-600 font-medium">
          {fileName}
        </span>
      )}
    </label>

    // </div>
  );
};
