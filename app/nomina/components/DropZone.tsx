"use client";

import { useState, useCallback } from "react";

interface Props {
  onFiles: (files: FileList) => void;
}

export default function DropZone({ onFiles }: Props) {
  const [dragging, setDragging] = useState(false);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      if (e.dataTransfer.files.length > 0) onFiles(e.dataTransfer.files);
    },
    [onFiles]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer
        ${dragging
          ? "border-emerald-500 bg-emerald-950/30"
          : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/50"
        }`}
    >
      <input
        type="file"
        multiple
        accept=".xml"
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        onChange={(e) => { if (e.target.files) onFiles(e.target.files); }}
      />
      <div className="text-4xl mb-3">BeckyBooEz</div>
      <p className="text-zinc-300 font-semibold text-sm">
        Arrastra tus XMLs aquí o haz clic para seleccionarlos
      </p>
      <p className="text-zinc-600 text-xs mt-1">
        SAT → Factura electrónica → Consulta de CFDI → Tipo: Nómina → 2025
      </p>
    </div>
  );
}
