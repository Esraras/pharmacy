import { MainBanner } from '../components/Home/MainBanner';
import { PromoBanners } from '../components/Home/PromoBanners';
import { NearestStores } from '../components/Home/NearestStores';
import { AddPharmacyPromo } from '../components/Home/AddPharmacyPromo';
import { Reviews } from '../components/Home/Reviews';

export const HomePage = () => {
  return (
    <div className="container">
      <MainBanner />
      <PromoBanners />
      <NearestStores />
      <AddPharmacyPromo />
      <Reviews />
    </div>
  );
};