import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nextConfig from '../next-i18next.config'

// export const getI18nPaths = () =>
//   i18nextConfig.i18n.locales.map(lng => ({
//     params: {
//       locale: lng,
//     },
//   }))

export const getStaticPaths = () => {
  const edits = [];
  return ({
  fallback: false,
  paths: [
    ...i18nextConfig.i18n.locales.flatMap((lng) => 
      edits.map((editValue) => ({
        params: {
          locale: lng,
          edit: editValue, // Include the edit parameter in each path
        },
      }))
    ),
  ],
})}

export const getI18nProps = async (ctx, ns = ['common']) => {
  const locale = ctx?.params?.locale || i18nextConfig.i18n.defaultLocale;
  const props = { // Changed from let to const
    ...(await serverSideTranslations(locale, ns)),
  };
  return props;
};

export const makeStaticProps =
  (ns = []) =>
  async ctx => ({
    props: await getI18nProps(ctx, ns),
  })
