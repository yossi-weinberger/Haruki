import PageTransition from '@/components/layout/page-transition';
import { useI18n } from '@/i18n/use-i18n';

export default function AboutPage() {
  const { t } = useI18n();
  const featureItems = [
    t('featureOne'),
    t('featureTwo'),
    t('featureThree'),
    t('featureFour'),
    t('featureFive'),
    t('featureSix')
  ] as const;

  const architectureItems = [
    t('architectureOne'),
    t('architectureTwo'),
    t('architectureThree'),
    t('architectureFour'),
    t('architectureFive')
  ] as const;

  return (
    <PageTransition>
      <section className='space-y-2'>
        <h1 className='text-2xl font-semibold tracking-tight'>{t('aboutTitle')}</h1>
        <p className='text-muted-foreground text-sm'>{t('aboutSubtitle')}</p>
      </section>

      <section className='surface space-y-3 p-5'>
        <p className='text-sm leading-6 italic'>{t('navQuote')}</p>
        <p className='text-muted-foreground text-xs'>{t('aboutQuoteByline')}</p>
      </section>

      <section className='surface space-y-4 p-5'>
        <h2 className='text-lg font-semibold'>{t('aboutFeaturesTitle')}</h2>
        <ul className='text-sm leading-6'>
          {featureItems.map((featureItem) => (
            <li key={featureItem} className='text-muted-foreground'>
              - {featureItem}
            </li>
          ))}
        </ul>
      </section>

      <section className='surface space-y-4 p-5'>
        <h2 className='text-lg font-semibold'>{t('aboutArchitectureTitle')}</h2>
        <ul className='text-sm leading-6'>
          {architectureItems.map((architectureItem) => (
            <li key={architectureItem} className='text-muted-foreground'>
              - {architectureItem}
            </li>
          ))}
        </ul>
      </section>

      <section className='surface space-y-3 p-5'>
        <h2 className='text-lg font-semibold'>{t('aboutPrivacyTitle')}</h2>
        <p className='text-muted-foreground text-sm'>{t('aboutPrivacyText')}</p>
      </section>

      <section className='surface space-y-4 p-5'>
        <h2 className='text-lg font-semibold'>{t('aboutTechTitle')}</h2>
        <p className='text-muted-foreground text-sm'>{t('aboutTechStack')}</p>
      </section>

      <section className='surface space-y-3 p-5'>
        <h2 className='text-lg font-semibold'>{t('aboutCreditsTitle')}</h2>
        <p className='text-muted-foreground text-sm'>{t('aboutCreditsText')}</p>
        <p className='text-muted-foreground text-sm'>
          {t('aboutCreditsTemplate')}
          <a
            href='https://github.com/doinel1a/vite-react-ts-shadcn-ui'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary underline underline-offset-2 hover:no-underline'
          >
            vite-react-ts-shadcn-ui
          </a>
          .
        </p>
        <p className='text-muted-foreground text-sm'>
          {t('aboutCreditsUiverse')}
          <a
            href='https://uiverse.io/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary underline underline-offset-2 hover:no-underline'
          >
            uiverse.io
          </a>
          .
        </p>
      </section>
    </PageTransition>
  );
}
