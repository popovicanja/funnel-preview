type JsonEditorProps = {
  json: string;
  onChange: (json: string) => void;
};

export const JsonEditor: React.FC<JsonEditorProps> = ({ json, onChange }) => {
  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      className="w-full h-full min-h-[64px] resize-none p-2 bg-gray-50 text-violet-950 border border-gray-200 rounded-lg focus:border-violet-400 focus:ring focus:ring-violet-200 focus:outline-none"
      value={json}
      onChange={handleJsonChange}
      rows={8}
      placeholder="Paste or edit your JSON here..."
    />
  );
};
