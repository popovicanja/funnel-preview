import { useRef, useState } from "react";
import { Funnel } from "./types/funnel";
import { FunnelPreview } from "./components/funnel/FunnelPreview/FunnelPreview";
import { JsonImportPanel } from "./components/uploader/JsonImportPanel";
import perspectiveLogo from "./assets/perspective-logo.png";

function App() {
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const funnelWrapperRef = useRef<HTMLDivElement>(null);

  const handleFunnelLoad = (loadedFunnel: Funnel) => {
    setFunnel(loadedFunnel);

    setTimeout(() => {
      funnelWrapperRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  // Layout: mobile always 1 column; on desktop, split into 2 columns if funnel exists, otherwise 1 column
  const gridCss = `grid ${
    funnel ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
  }`;

  return (
    <div className="w-full flex flex-col font-inter pt-2 md:py-4">
      <AppHeader />

      <main
        className={`w-full max-w-[1200px] mx-auto rounded-lg md:shadow-sm md:border md:border-black/10 ${gridCss}`}
      >
        <JsonImportPanel onFunnelLoad={handleFunnelLoad} />

        {funnel && (
          <div
            ref={funnelWrapperRef}
            className="md:border-l md:border-l-black/10"
          >
            <FunnelPreview funnel={funnel} />
          </div>
        )}
      </main>
    </div>
  );
}

const AppHeader: React.FC = () => (
  <header className="flex items-center justify-center gap-2 py-4 md:py-8">
    <img src={perspectiveLogo} alt="Perspective Logo" className="h-8" />
    <h1 className="text-4xl font-semibold text-center">Funnel Preview</h1>
  </header>
);

export default App;
