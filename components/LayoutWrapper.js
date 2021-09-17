import SectionContainer from './SectionContainer'
import Footer from './Footer'
import NavBar from './NavBar'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <NavBar />
      <SectionContainer>
        <div className="flex flex-col justify-between h-screen">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
