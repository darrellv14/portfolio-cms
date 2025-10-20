import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-muted/20 mt-0 border-t py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 2xl:max-w-[90rem]">
        <p className="text-muted-foreground text-sm">
          {currentYear} PT Sukses Cuan Bersama Darrell (SCBD)®
        </p>
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary h-10 w-10" />
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/drvu0dpry/image/upload/v1760967599/footer_eaf8ep.webp"
              alt="Darrell Logo"
              width={96}
              height={96}
            />
          </Link>
        </div>
        <p className="text-muted-foreground invisible text-sm md:visible">
          © {currentYear} Darrell Valentino. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
