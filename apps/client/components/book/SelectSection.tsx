import Logo from "../global/Logo";
import { GridBg } from "@workspace/ui/components/GridBg";
import { useTranslations } from "next-intl";

function SelectSection() {

    const t = useTranslations("bookpage");

  return (
    <div className="w-full h-full absolute right-0 top-0 bg-gray-100 dark:bg-slate-800 grid place-items-center">
      <GridBg>
        <div className="z-10 text-center p-4">
          <div className="flex items-center justify-center md:mb-8 mb-4">
            <Logo />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">{t("entry-title")}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
            {t("entry-description")}
          </p>
        </div>
      </GridBg>
    </div>
  );
}

export default SelectSection;
