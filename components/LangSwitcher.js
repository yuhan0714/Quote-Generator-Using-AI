"use client";
import { localeItems, usePathname, useRouter } from '@/navigation';
import { useLocale } from "next-intl";
export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  console.log(locale)

  const handleChange = (e) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (

    <select
      value={locale}
      onChange={handleChange}
      style={{
        backgroundColor: '#fff', // 设置背景为白色
        color: '#000', // 设置字体颜色为黑色
        border: '1px solid #ccc', // 设置边框颜色
        height: '35px',
        width: '85px',
        margin: '8px',
        padding: '4px',
        borderRadius: '4px',
      }}
    >
      <option value={locale} > {GetLangData(locale).name}</option>

      {localeItems.map((item) => {

        if (item.code === locale) return null
        return (<option key={item.code} value={item.code}>
          {item.name}
        </option>)
      })}
    </select>

  );
}
export function GetLangData(defaultLocale) {
  var res = {}
  {
    localeItems.map(locale => {
      if (locale.code === defaultLocale) {
        console.log(locale)
        res = locale
      }
    })
  }
  return res

}