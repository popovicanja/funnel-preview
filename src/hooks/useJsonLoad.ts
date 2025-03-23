import { useEffect, useState } from "react";
import { validateUploadedJSON, Validation } from "../utils/validateJson";
import { Funnel } from "../types/funnel";

const defaultValidationObject = {
  error: null,
  warnings: [],
  valid: true,
};

export const useJsonLoad = (
  json: string,
  onFunnelLoad: (funnel: Funnel) => void
) => {
  const [validation, setValidation] = useState<Omit<Validation, "data">>(
    defaultValidationObject
  );

  useEffect(() => setValidation(defaultValidationObject), [json]);

  const loadJson = () => {
    const validationResult = validateUploadedJSON(json);
    setValidation(validationResult);

    const { data, valid } = validationResult;
    if (valid && data) {
      onFunnelLoad(data);
    }
  };

  return { validation, loadJson };
};
