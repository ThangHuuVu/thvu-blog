import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import { Container } from "@/lib/types/common";

const LayoutWrapper = ({ children }: Container) => {
  return (
    <>
      <Header />
      <SectionContainer>
        <div className="flex flex-col justify-between min-h-screen">
          <main>{children}</main>
        </div>
        <Footer />
      </SectionContainer>
    </>
  );
};

export default LayoutWrapper;
