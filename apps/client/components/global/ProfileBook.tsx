import useDelete from "@/hooks/useDelete";
import "@/public/css/profile-book.css";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { mutate } from "swr";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

interface Props {
  title: string;
  bookId: string;
  userId: string;
}

function ProfileBook({ bookId, userId }: Props) {
  const { deleteData } = useDelete();

  const handleDeleteBook = () => {
    deleteData({
      url: `/book/${bookId}`,
      onSuccess: () => {
        mutate(`/user/${userId}/book`);
      },
    });
  };

  return (
    <div className="flex items-center gap-5">
      <Link href={`/book/${bookId}`}>
        <div className="text-sm cursor-pointer flex items-center gap-1 text-blue-500 hover:text-blue-600">
          <Edit size={15} />
          Edit
        </div>
      </Link>

      <DeleteConfirmationModal
        onConfirm={handleDeleteBook}
        text="Are you sure you want to delete this book?"
      >
        <div className="text-sm cursor-pointer flex items-center gap-1 text-red-500 hover:text-red-600">
          <Trash size={15} />
          Delete
        </div>
      </DeleteConfirmationModal>
    </div>
  );
}

export default ProfileBook;
