import { HomeLayout } from "@/components/layout/HomeLayout";
import { getCurrentUser } from "@/lib/session";
import { HomeLayoutChildren } from "@/types/layout";
import { UserInfo } from "@/types/user";
import { Metadata } from 'next';

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
  const pageUrl = locale === 'en' ? `${baseUrl}incorrectquotegenerator` : `${baseUrl}${locale}/incorrectquotegenerator`;
  return {
    title: seo.incorrectquotegenerator.title,
    description: seo.incorrectquotegenerator.description,
    keywords: seo.incorrectquotegenerator.keywords,
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function HomePageLayout({ children }: HomeLayoutChildren) {
  const user = (await getCurrentUser()) as UserInfo;

  return (
    <>
      <HomeLayout children={children} user={user} />
    </>
  );
}
