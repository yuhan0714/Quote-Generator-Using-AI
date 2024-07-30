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
  const pageUrl = locale === 'en' ? `${baseUrl}privacypolicy` : `${baseUrl}${locale}/privacypolicy`;
  return {
    title: seo.privacypolicy.title,
    description: seo.privacypolicy.description,
    keywords: seo.privacypolicy.keywords,
    alternates: {
      canonical: pageUrl,
    },
  };
}


export default async function PrivacyPage() {
  const user = (await getCurrentUser()) as UserInfo;
  const t = await getTranslations('PrivacyPolicy');
  return (
    <div className="container flex w-screen flex-col">
      <div className="mx-auto flex flex-1 w-full flex-col space-y-6 sm:w-[700px] px-4">
        <div className="flex flex-col space-y-2">
          <Image
            alt="logo"
            src="/logo.png"
            className="sm:w-12 sm:h-12 w-6 h-6 mx-auto"
            width={320}
            height={320}
          />
          <h1 className="text-2xl font-semibold tracking-tight  text-center">
            {t('Title')}
          </h1>
          <p className="text-m text-muted-foreground">
            {t('text')}
          </p>
        </div>
      </div>
    </div>
  );
}
