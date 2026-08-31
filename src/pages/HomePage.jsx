import BenefitsSection from '../components/home/BenefitsSection.jsx'
import FeaturesSection from '../components/home/FeaturesSection.jsx'
import FinalCTA from '../components/home/FinalCTA.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import ValueSection from '../components/home/ValueSection.jsx'

function HomePage() {
  return (
    <div>
      <HeroSection />
      <ValueSection />
      <FeaturesSection />
      <HowItWorks />
      <BenefitsSection />
      <FinalCTA />
    </div>
  )
}

export default HomePage
