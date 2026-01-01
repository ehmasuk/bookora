import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/images/logo-icon.png" alt="Bookora Logo" width={30} height={30} />
      <h1 className="text-base font-bold md:text-2xl">BookOra</h1>
    </Link>
  );
}

export default Logo;
