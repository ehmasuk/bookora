import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  bookId: string;
  format: "pdf" | "docx";
}

const ExportBook = ({children,bookId,format}:Props) => {
    const handleExport = async () => {

    const fetchUrl = `${process.env.NEXT_PUBLIC_API_URI}/book/${bookId}/export?format=${format}`  

    const res = await fetch(fetchUrl);

    if (!res.ok) {
      toast.error("Export failed");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const disposition = res.headers.get("content-disposition");
    const fileName = disposition?.match(/filename="(.+)"/)?.[1] ?? "bookora";

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

  };

  return <div onClick={handleExport}>{children}</div>
}

export default ExportBook