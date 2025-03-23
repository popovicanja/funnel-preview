import React, { useState } from "react";
import { Funnel } from "../../types/funnel";
import { useJsonLoad } from "../../hooks/useJsonLoad";
import { JsonUploader } from "./JsonUploader";
import { JsonValidationInfo } from "./JsonValidationInfo";
import { JsonEditor } from "./JsonEditor";

interface JsonImportPanelProps {
  onFunnelLoad: (funnel: Funnel) => void;
}

export const JsonImportPanel: React.FC<JsonImportPanelProps> = ({
  onFunnelLoad,
}) => {
  const [jsonValue, setJsonValue] = useState<string>("");
  const { validation, loadJson } = useJsonLoad(jsonValue, onFunnelLoad);

  const isLoadBtnDisabled = !jsonValue;

  return (
    <div className="flex justify-center w-full p-4 md:p-8">
      <div className="flex flex-col gap-4 w-full md:max-w-[600px]">
        <h2 className="text-xl font-semibold py-2 text-center">Json Editor</h2>

        <JsonUploader onLoaded={setJsonValue} />

        <JsonValidationInfo
          error={validation?.error}
          warnings={validation?.warnings}
        />

        <JsonEditor json={jsonValue} onChange={setJsonValue} />

        <button
          onClick={loadJson}
          disabled={isLoadBtnDisabled}
          className={`p-4 text-white mx-auto rounded-lg w-full md:w-auto ${
            isLoadBtnDisabled
              ? "bg-violet-300"
              : "bg-violet-500 hover:opacity-90 cursor-pointer "
          }`}
        >
          Load JSON
        </button>
      </div>
    </div>
  );
};
