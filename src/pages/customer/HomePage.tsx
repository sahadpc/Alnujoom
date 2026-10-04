import React, { useEffect } from 'react';
import { HeroSection } from '../../components/customer/HeroSection';
import { BrandTicker } from '../../components/customer/BrandTicker';
import { TrustSection } from '../../components/customer/TrustSection';
import { CategoryCards } from '../../components/customer/CategoryCards';
import { LensSimulatorSection } from '../../components/customer/LensSimulatorSection';
import { FeaturedProducts } from '../../components/customer/FeaturedProducts';
import { FrameShapeAdvisor } from '../../components/customer/FrameShapeAdvisor';
import { WhyChooseSection } from '../../components/customer/WhyChooseSection';
import { TestimonialsSection } from '../../components/customer/TestimonialsSection';
import { CustomerCtaSection } from '../../components/customer/CustomerCtaSection';
import { ContactPreviewSection } from '../../components/customer/ContactPreviewSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'AlNujoom Opticals | Luxury Eyewear & Clinical Eye Care Dubai';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <BrandTicker />
      <TrustSection />
      <CategoryCards />
      <LensSimulatorSection />
      <FeaturedProducts />
      <FrameShapeAdvisor />
      <WhyChooseSection />
      <TestimonialsSection />
      <CustomerCtaSection />
      <ContactPreviewSection />
    </div>
  );
};
