interface Props {
  errores: string[];
}

export default function ErrorList({ errores }: Props) {
  if (errores.length === 0) return null;

  return (
    <div className="bg-red-950/40 border border-red-800 rounded-lg p-4 space-y-1">
      <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
        ⚠ Archivos con problemas
      </p>
      {errores.map((e, i) => (
        <p key={i} className="text-red-300 text-xs">{e}</p>
      ))}
    </div>
  );
}
