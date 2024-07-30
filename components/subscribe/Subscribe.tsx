'use client';

import SubscribeCard from "@/components/subscribe/SubscribeCard";
import { axios } from "@/lib/axios";
import {
  BOOST_PACK_CREDITS,
  SINGLE_VARIANT_KEY,
  SUBSCRIPTION_VARIANT_KEY
} from "@/lib/constants";
import { CreateCheckoutResponse, SubscribeInfo } from "@/types/subscribe";
import { UserInfo } from "@/types/user";
import { useTranslations } from 'next-intl';
import { toast } from "react-hot-toast";

export default function Subscribe({ user }: { user: UserInfo | null }) {
  const t = useTranslations('HomePage');

  const subscribeInfo: SubscribeInfo = {
    free: {
      title: t('Pricing.FreeTitle'),
      description: t('Pricing.FreeDescription'),
      amount: 0,
      expireType: "day",
      possess: [
        t('Pricing.FreeCredits'),
        t('Pricing.OptionalPurchase'),
      ],
    },
    membership: {
      isPopular: true,
      title: t('Pricing.PremiumTitle'),
      description: t('Pricing.PremiumDescription'),
      amount: 4.99,
      expireType: "month",
      possess: [
        t('Pricing.PremiumCredits'),
        t('Pricing.OptionalPurchase'),
        t('Pricing.EarlyAccess'),
      ],
      buttonText: t('Pricing.UpgradeNow'),
      mainClassName: "purple-500",
      buttonClassName: "bg-gradient-to-r from-pink-500 to-purple-500",
    },
    boostPack: {
      title: t('Pricing.BoostPackTitle'),
      description: t('Pricing.BoostPackDescription'),
      amount: Number(process.env.NEXT_PUBLIC_BOOST_PACK_PRICE || "0"),
      possess: [
        t('Pricing.BoostPackOneOffBuy'),
        t('Pricing.BoostPackValidity'),
        t('Pricing.BoostPackNoRenewal'),
      ],
      buttonText: t('Pricing.GetCredits', { credits: BOOST_PACK_CREDITS || "100" }),
    },
  };

  const getStartFreeVersion = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const subscribe = async () => {
    if (!user || !user.userId) {
      toast.error(t('Pricing.loginRequired'));
      return;
    }
    try {
      const { checkoutURL } = await axios.post<any, CreateCheckoutResponse>(
        "/api/payment/subscribe",
        {
          userId: user.userId,
          type: SUBSCRIPTION_VARIANT_KEY,
        },
        {
          headers: {
            token: user.accessToken,
          },
        }
      );
      window.location.href = checkoutURL;
    } catch (err) {
      console.log(err);
    }
  };

  const purchase = async () => {
    if (!user || !user.userId) {
      toast.error(t('Pricing.loginRequired'));
      return;
    }
    console.log("purchase");
    try {
      const { checkoutURL } = await axios.post<any, CreateCheckoutResponse>(
        "/api/payment/subscribe",
        {
          userId: user.userId,
          type: SINGLE_VARIANT_KEY,
        },
        {
          headers: {
            token: user.accessToken,
          },
        }
      );
      window.location.href = checkoutURL;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold mb-8 text-zinc-800">Pricing</h2>
      </div>
      <section className="w-full py-0 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <SubscribeCard
              info={subscribeInfo.free}
              clickButton={getStartFreeVersion}
            />
            <SubscribeCard
              id="subscription-card"
              info={subscribeInfo.membership}
              clickButton={subscribe}
            />
            <SubscribeCard
              id="bootsPack-card"
              info={subscribeInfo.boostPack}
              clickButton={purchase}
            />
          </div>
        </div>
      </section>
    </div>
  );
}