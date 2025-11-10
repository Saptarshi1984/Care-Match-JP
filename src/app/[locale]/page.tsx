import {getTranslations} from 'next-intl/server';
import HeroPage from '@/components/HeroPage';
export default async function HomePage() {
  const t = await getTranslations('Hero');
  return (
    <>
    <HeroPage />
    </>
    
  )

}
