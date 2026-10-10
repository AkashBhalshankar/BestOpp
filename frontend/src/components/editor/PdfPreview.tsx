import React from "react";

interface PdfPreviewProps {
  pdfBase64?: string | null;
}

export const PdfPreview: React.FC<PdfPreviewProps> = ({ pdfBase64 }) => {
  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-center bg-[var(--bg-canvas,#0A0D12)]/90 p-4">
      {pdfBase64 ? (
        <iframe
          src={`data:application/pdf;base64,${pdfBase64}`}
          className="w-full h-full rounded border border-slate-700 shadow-xl"
          title="Tectonic PDF Document"
        />
      ) : (
        <div className="text-center font-mono text-xs text-slate-500">
          Click "Compile Tectonic PDF" to render publication-grade output.
        </div>
      )}
    </div>
  );
};
