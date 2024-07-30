import { Link } from '@/navigation';
import { BsGithub, BsTwitterX, BsWechat } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import { SiBuymeacoffee, SiJuejin } from "react-icons/si";

const ContactMe = () => {
  return (
    <div className="mx-auto flex flex-row items-center">
      <Link
        href="/"
        rel="noopener norefferer nofollow"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <MdEmail className="text-lg" />
      </Link>
      <Link
        href="/"
        rel="noopener norefferer nofollow"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <BsGithub className="text-lg" />
      </Link>
      <Link
        href="/"
        rel="noopener norefferer nofollow"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <BsTwitterX className="text-lg" />
      </Link>
      <Link
        href="/"
        rel="noopener norefferer nofollow"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <SiJuejin className="text-lg" />
      </Link>
      <Link
        href="/"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <BsWechat className="text-lg" />
      </Link>
      <Link
        href="/"
        rel="noopener norefferer nofollow"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <SiBuymeacoffee className="text-lg" />
      </Link>
    </div>
  );
};
export default ContactMe;
