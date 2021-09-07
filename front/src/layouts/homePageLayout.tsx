import Navbar from "../components/navbar";
import { Carousel } from "react-carousel-minimal";
import slider1 from "../sliderImgs/slider1.jpg";
import slider2 from "../sliderImgs/slider2.jpg";
import slider3 from "../sliderImgs/slider3.jpg";
import { Container } from "@material-ui/core";
import Footer from "../components/footer";

const HomePageLayout: React.FC<{}> = ({ children }) => {
  const data = [
    {
      image: `${slider1}`,
    },
    {
      image: `${slider2}`,
    },
    {
      image: `${slider3}`,
    },
  ];

  return (
    <>
      <Navbar />
      <Carousel
        data={data}
        time={4000}
        width="100%"
        height="auto"
        radius="10px"
        captionPosition="bottom"
        automatic={true}
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        style={{
          textAlign: "center",
          maxWidth: "100%",
          margin: "40px auto",
        }}
      />
      <Container
        component="main"
        maxWidth="lg"
        style={{
          background: "#e5e2e2",
          height: "auto",
          marginBottom: 20,
          paddingBottom: 25,
          paddingTop: 50,
        }}
      >
        <div>{children}</div>
      </Container>
      <Footer />
    </>
  );
};

export default HomePageLayout;
