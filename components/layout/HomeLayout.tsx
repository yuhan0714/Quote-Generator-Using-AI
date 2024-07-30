import { HomeLayoutProps } from "@/types/layout";

export const HomeLayout = ({ children, user }: HomeLayoutProps) => {
  return (
    <div className="flex max-full mx-auto flex-col justify-center py-0 px-4">
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center">
        {children}
      </main>
    </div>
  );
};
