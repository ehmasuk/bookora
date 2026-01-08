import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  bookId: string;
}

const ExportBook = ({children,bookId}:Props) => {
    const handleExport = async () => {
    const res = await fetch(`http://localhost:8080/api/book/${bookId}/export`);

    if (!res.ok) {
      toast.error("Export failed");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "book.docx";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

    toast.success("Book downloaded");
  };

  return <div onClick={handleExport}>{children}</div>
}

export default ExportBook