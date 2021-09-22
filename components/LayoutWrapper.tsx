import SectionContainer from "./SectionContainer";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Container } from "@/lib/types/common";

const LayoutWrapper = ({ children }: Container) => {
  return (
    <>
      <NavBar />
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
