import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-muted/20 mt-16 border-t py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 2xl:max-w-[90rem]">
        <p className="text-muted-foreground text-sm">
          {currentYear} PT Sukses Cuan Bersama Darrell (SCBD)&reg;
        </p>
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary h-10 w-10" />
          <Link href="/">
            <Image
              src="https://cdn.discordapp.com/attachments/845650386768756737/1429154582617002075/a54c500be293c78a03091a29e6da8f89.webp?ex=68f51b6c&is=68f3c9ec&hm=1fda14ed179117077fa49a227192420808cb939cdae21ea6a07f7af6fb97c7b7"
              alt="Darrell Logo"
              width={96}
              height={96}
            />
          </Link>
        </div>
        <p className="text-muted-foreground invisible text-sm md:visible">
          &copy; {currentYear} Darrell Valentino. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
