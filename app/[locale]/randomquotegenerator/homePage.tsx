"use client";

import DropDown, { LanguageType } from "@/components/DropDown";
import Github from "@/components/icons/GitHub";
import Subscribe from "@/components/subscribe/Subscribe";
import { formatNumber } from "@/lib/data";
import { Link } from '@/navigation';
import { UserInfo } from "@/types/user";
import { useCompletion } from "ai/react";
import dayjs from "dayjs";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";



interface HomePageProps {
  usage: number;
  user: UserInfo | null;
  remaining: number;
  boostPackRemaining: number;
  membershipExpire: number;
  boostPackExpire: number;
}

export default function HomePage({
  usage,
  user,
  remaining,
  boostPackRemaining,
  membershipExpire,
  boostPackExpire,
}: HomePageProps) {
  const [currentUses, setCurrentUses] = useState(0);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [boostPackRemainingCredits, setBoostPackRemainingCredits] = useState(0);
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState<LanguageType>("English");
  const answerRef = useRef<null | HTMLDivElement>(null);


  const scrollToAnswer = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { complete, completion, isLoading, handleSubmit } = useCompletion({
    api: "/api/completion",
    body: {
      language,
      prompt: content,
    },
    headers: {
      token: user?.accessToken || "",
    },
    onResponse: (res) => {
      if (res.status === 429) {
        toast.error("You are being rate limited. Please try again later.");
        return;
      }
      setCurrentUses((pre) => pre + 1);
      scrollToAnswer();
    },
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    []
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    complete(content);
    handleSubmit(e);
  };

  const answer = completion;

  useEffect(() => {
    if (currentUses <= remaining) {
      setRemainingCredits(remaining - currentUses);
      setBoostPackRemainingCredits(boostPackRemaining);
    } else {
      setBoostPackRemainingCredits(
        boostPackRemaining - (currentUses - remaining)
      );
    }
  }, [remaining, boostPackRemaining, currentUses]);
  const t = useTranslations('Random Quote Generator');
  return (
    <>
      <div
        className="mx-auto mt-6 flex items-center justify-center space-x-5"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <a
          rel="noopener noreferrer"
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
        >
          <Github className="h-5 w-5" />
          <p className="text-sm font-semibold">1000+ star on GitHub</p>
        </a>
      </div>
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
        {t('FirstScreen.BigTitle')}
      </h1>

      <p className="text-slate-500 mt-5">
        {formatNumber({ value: Number(usage) + currentUses })} {t('FirstScreen.SmallTitle')}
      </p>
      <form className="max-w-xl w-full" onSubmit={onSubmit}>
        <div className="flex mt-10 items-center space-x-3">
          <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">
            {t('FirstScreen.tips1')}
          </p>
        </div>
        <textarea
          value={content}
          onChange={handleInputChange}
          rows={4}
          className="w-full rounded-md bg-white border border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 px-2 py-1"
          placeholder={"e.g. why i should be exercising more"}
        />
        <div className="flex mb-5 items-center space-x-3">
          <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">{t('FirstScreen.tips2')}</p>
        </div>
        <div className="block">
          <DropDown
            language={language}
            setLanguage={(newLanguage) => setLanguage(newLanguage)}
          />
        </div>

        {user ? (
          <>
            <div className="text-left mt-6 mb-2 text-gray-500 text-sm">
              <div>
                {remainingCredits <= 0 ? 0 : remainingCredits} {t('FirstScreen.tips3')}
                <>
                  {membershipExpire ? (
                    <>
                      (Membership Expires on:{" "}
                      {dayjs(membershipExpire).format("YYYY-MM-DD HH:mm")})
                    </>
                  ) : (
                    <></>
                  )}
                </>
              </div>
              {boostPackExpire ? (
                <div>
                  {boostPackRemainingCredits} boost pack credits (Expires on:{" "}
                  {dayjs(boostPackExpire * 1000).format("YYYY-MM-DD HH:mm")})
                </div>
              ) : (
                <></>
              )}
            </div>

            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
              type="submit"
              disabled={
                isLoading || remainingCredits + boostPackRemainingCredits <= 0
              }
              style={{
                cursor:
                  isLoading || remainingCredits + boostPackRemainingCredits <= 0
                    ? "not-allowed"
                    : "",
              }}
            >
              {isLoading ? (
                <span className="loading">
                  <span style={{ backgroundColor: "white" }} />
                  <span style={{ backgroundColor: "white" }} />
                  <span style={{ backgroundColor: "white" }} />
                </span>
              ) : remainingCredits + boostPackRemainingCredits <= 0 ? (
                <Link
                  href={
                    user.role === 0 ? "/#subscription-card" : "/#bootsPack-card"
                  }
                >
                  {
                    /**
                     * 普通用户的引导文字：引导购买会员
                     * 会员用户的引导文字：引导购买加油包
                     * Prompt for regular users: Guide to purchase membership
                     * Prompt for member users: Guide to purchase a boost package
                     */
                    user.role === 0
                      ? "Become a member to enjoy 500 credits every day."
                      : "Purchase a Boost Pack to get more credits right now."
                  }
                </Link>
              ) : (
                <span>{t('FirstScreen.button1')} &rarr;</span>
              )}
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full">
              <span>{t('FirstScreen.button2')} &rarr;</span>
            </button>
          </Link>
        )}
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <hr className="h-px bg-gray-700 border-1" />
      <output className="space-y-10 my-10">
        {answer && (
          <>
            <div>
              <h2
                className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                ref={answerRef}
              >
                {t('FirstScreen.result')}
              </h2>
            </div>
            <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
              <div
                className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                onClick={() => {
                  navigator.clipboard.writeText(answer);
                  toast("Copied", {
                    icon: "✂️",
                  });
                }}
              >
                <div className="whitespace-pre-wrap text-left">{answer}</div>
              </div>
            </div>
          </>
        )}
      </output>

      {/* subscribe */}
      <Subscribe user={user} />





      <section>

        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 py-16 md:px-10 md:py-20">

          <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
            <h1 className="mx-auto text-center font-bold text-black lg: text-3xl lg:text-4xl"> {t('FAQ.BigTitle')} </h1>
            <p className="font-inter mt-4 max-w-xl px-5 text-center text-base font-light text-gray-500 lg:max-w-lg"> {t('FAQ.SmallTitle')} </p>
          </div>

          <div className="mt-10 flex w-full max-w-4xl flex-col">

            <div className="relative my-3 w-full rounded-md border border-gray-300 px-12 py-8">
              <div className="max-w-3xl">
                <h2 className="font-bold text-black text-xl"> {t('FAQ.Q1')} </h2>
                <p className="font-inter mt-4 text-base font-light text-gray-500"> {t('FAQ.A1')} </p>
              </div>
              <a href="" className="absolute right-5 top-9">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white"></circle>
                  <path d="M7.04688 11.9999H16.9469" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>

            <div className="relative my-3 w-full rounded-md border border-gray-300 px-12 py-8">
              <div className="max-w-3xl">
                <h2 className="font-bold text-black text-xl"> {t('FAQ.Q2')} </h2>
                <p className="font-inter mt-4 text-base font-light text-gray-500"> {t('FAQ.A2')}</p>
              </div>
              <a href="" className="absolute right-5 top-9">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white"></circle>
                  <path d="M7.05078 12H16.9508" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 7.05005V16.95" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>

            <div className="relative my-3 w-full rounded-md border border-gray-300 px-12 py-8">
              <div className="max-w-3xl">
                <h2 className="font-bold text-black text-xl"> {t('FAQ.Q3')} </h2>
                <p className="font-inter mt-4 text-base font-light text-gray-500"> {t('FAQ.A3')}</p>
              </div>
              <a href="" className="absolute right-5 top-9">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white"></circle>
                  <path d="M7.05078 12H16.9508" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 7.05005V16.95" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>

            <div className="relative my-3 w-full rounded-md border border-gray-300 px-12 py-8">
              <div className="max-w-3xl">
                <h2 className="font-bold text-black text-xl"> {t('FAQ.Q4')}</h2>
                <p className="font-inter mt-4 text-base font-light text-gray-500"> {t('FAQ.A4')}</p>
              </div>
              <a href="" className="absolute right-5 top-9">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white"></circle>
                  <path d="M7.05078 12H16.9508" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 7.05005V16.95" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>
            <div className="relative my-3 w-full rounded-md border border-gray-300 px-12 py-8">
              <div className="max-w-3xl">
                <h2 className="font-bold text-black text-xl"> {t('FAQ.Q5')} </h2>
                <p className="font-inter mt-4 text-base font-light text-gray-500"> {t('FAQ.A5')}</p>
              </div>
              <a href="" className="absolute right-5 top-9">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white"></circle>
                  <path d="M7.05078 12H16.9508" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 7.05005V16.95" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>
            <div className="relative my-3 w-full rounded-md border border-gray-300 px-12 py-8">
              <div className="max-w-3xl">
                <h2 className="font-bold text-black text-xl"> {t('FAQ.Q6')} </h2>
                <p className="font-inter mt-4 text-base font-light text-gray-500"> {t('FAQ.A6')}</p>
              </div>
              <a href="" className="absolute right-5 top-9">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white"></circle>
                  <path d="M7.05078 12H16.9508" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 7.05005V16.95" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>
            <div className="relative my-3 w-full rounded-md border border-gray-300 px-12 py-8">
              <div className="max-w-3xl">
                <h2 className="font-bold text-black text-xl"> {t('FAQ.Q7')} </h2>
                <p className="font-inter mt-4 text-base font-light text-gray-500"> {t('FAQ.A7')}</p>
              </div>
              <a href="" className="absolute right-5 top-9">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white"></circle>
                  <path d="M7.05078 12H16.9508" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 7.05005V16.95" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>
            <div className="relative my-3 w-full rounded-md border border-gray-300 px-12 py-8">
              <div className="max-w-3xl">
                <h2 className="font-bold text-black text-xl"> {t('FAQ.Q8')} </h2>
                <p className="font-inter mt-4 text-base font-light text-gray-500"> {t('FAQ.A8')}</p>
              </div>
              <a href="" className="absolute right-5 top-9">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="white"></circle>
                  <path d="M7.05078 12H16.9508" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 7.05005V16.95" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
            </div>


          </div>
        </div>
      </section>

    </>
  );
}
