import { Link } from '@/navigation';


import { UserAuthForm } from "@/components/UserAuthForm";
import { getCurrentUser } from "@/lib/session";
import { UserInfo } from "@/types/user";
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from "next/image";

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  const messages = await import(`../../../messages/${locale}.json`);
  const seo = messages.seo;
  // 定义基本 URL，确保以 / 结尾
  const baseUrl = 'https://quotegenerator.cc/';
  // 根据语言和页面路径生成 URL
  const pageUrl = locale === 'en' ? `${baseUrl}login` : `${baseUrl}${locale}/login`;
  return {
    title: seo.login.title,
    description: seo.login.description,
    keywords: seo.login.keywords,
    alternates: {
      canonical: pageUrl,
    },
  };
}


export default async function LoginPage() {
  const user = (await getCurrentUser()) as UserInfo;
  const t = await getTranslations('Login');
  return (
    <div className="container flex w-screen flex-col items-center justify-center">
      <div className="mx-auto flex flex-1 w-full flex-col justify-center space-y-6 sm:w-[350px] px-4">
        <div className="flex flex-col space-y-2 text-center">
          <Image
            alt="logo"
            src="/logo.png"
            className="sm:w-12 sm:h-12 w-6 h-6 mx-auto"
            width={320}
            height={320}
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            {t('BigTitle')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('SmallTitle')}
          </p>
        </div>
        <UserAuthForm user={user} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          {t('text')}{" "}
          <Link
            href="/privacypolicy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
