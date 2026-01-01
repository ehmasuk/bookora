import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("footer");

  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-gray-200 text-sm dark:border-gray-800 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
