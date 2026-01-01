import Image from "next/image";

interface Props {
  text: string;
  onClick?: () => void;
  size?: "sm" | "lg";
}

function Empty({ text, onClick, size = "sm" }: Props) {
  return (
    <div
      onClick={onClick ? onClick : undefined}
      className={`w-full rounded border border-slate-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 p-4 text-center ${size === "sm" ? "h-10 text-sm" : "h-24 text-lg"}`}
    >
      <div className="flex items-center justify-center gap-1">
      <Image src="/images/empty-box.png" alt={text} className="pb-1.5" width={size === "sm" ? 30 : 60} height={size === "sm" ? 30 : 60} /> {text}
      </div>
    </div>
  );
}

export default Empty;
