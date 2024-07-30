import { siteConfig } from "@/config/site";
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const d = new Date();
  const currentYear = d.getFullYear();
  const t = useTranslations('HomePage');

  return (
    <footer>
      <div className="mt-16 pt-6 pb-2 flex flex-col items-center bg-black text-sm text-gray-400 border-t">
        {/*这一段是一排社交软件图标,暂时隐藏 <div className="mb-3 flex space-x-4">
          <ContactMe />
        </div>*/}
        <div className="mb-2 flex space-x-2 flex-wrap justify-center">
          <Link href="/" target="_blank">
            {t('Footer.q1')}
          </Link>
          <div>{" • "}</div>
          <Link href="/incorrectquotegenerator" target="_blank">
            {t('Footer.q2')}
          </Link>
          <div>{" • "}</div>
          <Link href="/inspirationalquotegenerator" target="_blank">
            {t('Footer.q3')}
          </Link>
          <div>{" • "}</div>
          <Link href="/aiquotegenerator" target="_blank">
            {t('Footer.q4')}
          </Link>
          <div>{" • "}</div>
          <Link href="/randomquotegenerator" target="_blank">
            {t('Footer.q5')}
          </Link>
          <Link href="/privacypolicy" target="_blank">
            {t('Footer.q6')}
          </Link>
          <Link href="/tos" target="_blank">
            {t('Footer.q7')}
          </Link>
        </div>
        <div className="mb-2 flex space-x-2 flex-wrap justify-center">
          <Link href="/" target="_blank">
            {t('Footer.FriendLinks')}
          </Link>
          <div>{" • "}</div>
          <a href="https://woy.ai/" target="_blank" title="Woy AI Tools Directory">Woy AI Tools</a>
          <div>{" • "}</div>
          <a href="https://allinai.tools" title="Explore the Best AI Tools" target="_blank">All in AI Tools</a>
          <div>{" • "}</div>
          <a href="https://tap4.ai/" title="Tap4 AI Tools Directory">Tap4 AI Tools Diresctory</a>
          <div>{" • "}</div>
          <a href='https://aitoolsforbest.com' title='AI Tools for Best'>AI Tools for Best</a>
          <div>{" • "}</div>
          <a href="https://aiwith.me" title="AI WITH.ME | Discover thousands of AI Tools">AI WITH.ME</a>
          <div>{" • "}</div>
          <a href="https://www.aitoolshubs.com/" title="aitoolshubs">aitoolshubs</a>
        </div>

        <div className="mb-2 flex space-x-2">
          <div>{`©${currentYear}`}</div>{" "}
          <Link href={siteConfig.url}>Quote Generator</Link>{" "}
          <div>All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
