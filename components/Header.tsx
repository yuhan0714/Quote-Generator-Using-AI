import LangSwitcher from "@/components/LangSwitcher";
import MainHeader from "@/components/MainHeader";
import UserAccountHeader from "@/components/UserAccountHeader";
import { UserInfo } from "@/types/user";
import dynamic from 'next/dynamic';

const ClientSideNav = dynamic(() => import("@/components/ClientSideNav"), { ssr: false });

export default function Header({ user }: { user?: UserInfo }) {
  return (
    <div
      className="fixed z-10 h-14 w-full border-b bg-white bg-opacity-60 shadow-sm"
      style={{
        backdropFilter: "saturate(50%) contrast(2) blur(5px)",
      }}
    >
      <header className="flex justify-between items-center w-full mt-2 border-b-1 pb-0 sm:px-4 px-2">
        <div className="flex items-center">
          <MainHeader />
          <ClientSideNav />

        </div>
        <LangSwitcher />
        <div>
          <UserAccountHeader
            user={{
              username: user?.username || "",
              avatar: user?.avatar || "",
              email: user?.email || "",
              role: user?.role || 0,
              membershipExpire: user?.membershipExpire,
            }}
          />
        </div>
      </header>
    </div>
  );
}