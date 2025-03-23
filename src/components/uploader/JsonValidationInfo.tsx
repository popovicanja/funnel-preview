type ValdiationInfoProps = {
  error?: string | null;
  warnings?: string[];
  className?: string;
};

export const JsonValidationInfo: React.FC<ValdiationInfoProps> = ({
  error,
  warnings,
  className,
}) => {
  const hasError = error !== null;
  const hasWarnings = warnings && warnings?.length > 0;

  if (!hasError && !hasWarnings) return <></>;

  const validationStyle = hasError
    ? "bg-red-100 text-red-900"
    : !hasError && hasWarnings
    ? `bg-amber-100 text-amber-900`
    : "";

  return (
    <div
      className={`flex flex-col rounded-lg gap-1 text-sm py-2 px-4 ${className} ${validationStyle}`}
    >
      {hasError && error}
      {!hasError &&
        hasWarnings &&
        warnings.map((warning, index) => <span key={index}>{warning}</span>)}
    </div>
  );
};
