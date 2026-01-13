import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@workspace/ui/components/bento-grid";

type FeatureItem = {
  title: string;
  description: string;
};

export function Features() {
  const t = useTranslations("homepage.features");
  const items = t.raw("items") as FeatureItem[];

  const icons = [
    <IconClipboardCopy key="1" className="h-4 w-4 text-neutral-500" />,
    <IconFileBroken key="2" className="h-4 w-4 text-neutral-500" />,
    <IconSignature key="3" className="h-4 w-4 text-neutral-500" />,
    <IconTableColumn key="4" className="h-4 w-4 text-neutral-500" />,
    <IconArrowWaveRightUp key="5" className="h-4 w-4 text-neutral-500" />,
  ];

  const images = [
    <Image
      key="f1"
      src="/images/f1.jpg"
      alt="Book Icon"
      className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      width={100}
      height={100}
    />,
    <Image
      key="f2"
      src="/images/f2.jpg"
      alt="Book Icon"
      className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      width={300}
      height={200}
    />,
    <Image
      key="f3"
      src="/images/f3.jpg"
      alt="Book Icon"
      className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      width={300}
      height={200}
    />,
    <Image
      key="f4"
      src="/images/f4.jpg"
      alt="Book Icon"
      className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      width={500}
      height={500}
    />,
    <Image
      key="f5"
      src="/images/f5.jpg"
      alt="Book Icon"
      className="w-full h-full min-h-[6rem] object-cover rounded-xl"
      width={300}
      height={200}
    />,
  ];

  return (
    <div className="py-10 md:py-20 max-w-4xl mx-auto px-4">
      <h2 className="text-neutrl-900 md:text-3xl text-2xl font-medium tracking-tight text-center dark:text-white">
        {t("title")}
      </h2>
      <p className="mt-2 md:text-lg text-base text-neutral-600 text-center dark:text-neutral-200 mb-10 max-w-2xl mx-auto">
        {t("description")}
      </p>
      <BentoGrid>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={images[i]}
            icon={icons[i]}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
