import { BillingForm } from "@/components/dashboard/billing-form";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardNav } from "@/components/dashboard/nav";
import { DashboardShell } from "@/components/dashboard/shell";
import { dashboardConfig } from "@/config/dashboard";
import { MEMBERSHIP_ROLE_VALUE } from "@/lib/constants";
import { getUserSubscriptionPlan } from "@/lib/lemonsqueezy/subscription";
import { getCurrentUser } from "@/lib/session";
import { SubScriptionInfo, UserSubscriptionPlan } from "@/types/subscribe";
import { UserInfo } from "@/types/user";
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  const messages = await import(`../../../../messages/${locale}.json`);
  const seo = messages.seo;
  // 定义基本 URL，确保以 / 结尾
  const baseUrl = 'https://quotegenerator.cc/';
  // 根据语言和页面路径生成 URL
  const pageUrl = locale === 'en' ? `${baseUrl}billing` : `${baseUrl}${locale}/billing`;
  return {
    title: seo.billing.title,
    description: seo.billing.description,
    keywords: seo.billing.keywords,
    alternates: {
      canonical: pageUrl,
    },
  };
}


export default async function BillingPage() {
  const t = await getTranslations('Billing');
  const tSubscribe = await getTranslations('Billing.Subscribe');

  const user = (await getCurrentUser()) as UserInfo;
  const subscription: SubScriptionInfo | null = await getUserSubscriptionPlan({
    userId: user.userId,
  });

  let subscriptionPlan: UserSubscriptionPlan = {
    role: 0,
    isPro: false,
    name: t('plans.free.name'),
    description: tSubscribe('free.description'),
    subscriptionId: "",
    membershipExpire: 0,
    customerId: "",
    variantId: 0,
    isCanceled: true,
    updatePaymentMethodURL: "",
  };

  if (subscription) {
    subscriptionPlan = {
      role: subscription.role,
      isPro: subscription.role === MEMBERSHIP_ROLE_VALUE,
      name: subscription.role === MEMBERSHIP_ROLE_VALUE ? t('plans.pro.name') : t('plans.free.name'),
      description:
        subscription.role === MEMBERSHIP_ROLE_VALUE
          ? tSubscribe('membership.description')
          : tSubscribe('free.description'),
      subscriptionId: subscription.subscriptionId,
      membershipExpire: subscription.membershipExpire,
      customerId: subscription.customerId,
      variantId: subscription.variantId,
      isCanceled: subscription.isCanceled,
      updatePaymentMethodURL: subscription.updatePaymentMethodURL,
    };
  }

  return (
    <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <DashboardShell>
          <DashboardHeader
            heading={t('header.heading')}
            text={t('header.text')}
          />
          <BillingForm
            subscriptionPlan={{
              ...subscriptionPlan,
            }}
            user={user}
          />
        </DashboardShell>
      </main>
    </div>
  );
}