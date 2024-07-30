import { Link } from '@/navigation';
import Image from "next/image";

export default function MainHeader() {
  return (
    <Link href="/" className="flex space-x-3">
      <Image
        alt="header text"
        src="/logo.png"
        className="sm:w-12 sm:h-12 w-8 h-8"
        width={320}
        height={320}
      />
      <span className="sm:text-2xl text-l ml-2 tracking-tight  flex items-center">
        Quote Generator
      </span>
    </Link>
  );
}