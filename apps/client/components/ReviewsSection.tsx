import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@workspace/ui/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";


type Review = {
  img: string;
  name: string;
  username: string;
  body: string;
};

type ReviewBase = Omit<Review, "img">;
const ReviewCard = ({ img, name, username, body }: Review) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width={32} height={32} alt="item" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function ReviewsSection() {
  const t = useTranslations("homepage.reviews");
  const reviewsBase = t.raw("items") as ReviewBase[];

  // add img field to each review
  const reviews: Review[] = reviewsBase.map((review, i) => ({
    ...review,
    img: `https://i.pravatar.cc/150?img=${i + 1}`,
  }));

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div className="relative py-20 flex w-full max-w-4xl px-4 mx-auto flex-col items-center justify-center overflow-hidden">
      <h2 className="text-neutrl-900 md:text-3xl text-2xl font-medium tracking-tight text-center dark:text-white">{t("title")}</h2>
      <p className="mt-2 md:text-lg text-base text-neutral-600 text-center dark:text-neutral-200 mb-10">{t("description")}</p>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}

