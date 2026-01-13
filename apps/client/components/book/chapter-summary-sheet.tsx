import useUpdate from "@/hooks/useUpdate";
import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Textarea } from "@workspace/ui/components/textarea";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

type Props = {
  chapterId: string;
};

export function ChapterSummarySheet({ chapterId }: Props) {
  const { data: chapter, isLoading } = useSWR(
    chapterId ? `/chapter/${chapterId}` : null,
  );

  console.log(chapter);

  const [summary, setSummary] = useState("");
  const { updateData } = useUpdate();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (chapter?.data?.summary) {
      setSummary(chapter.data.summary);
    }
  }, [chapter]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSummary(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateData({
        endpoint: `/chapter/${chapterId}`,
        data: { summary: value },
      });
    }, 1000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm">
          Chapter summary
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{chapter?.data?.title || "Chapter summary"}</SheetTitle>
          <SheetDescription>Summary</SheetDescription>
        </SheetHeader>
        <div className="px-4 mt-4">
          {
            isLoading ? (
              <Skeleton className="w-full h-20" />
            ) : (
              <Textarea
                placeholder="Write a summary to make your writing more easier"
                value={summary}
                onChange={handleChange}
                className="min-h-[200px]"
              />
            )
          }
        </div>
      </SheetContent>
    </Sheet>
  );
}
