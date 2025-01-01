import {
  useState,
  Box,
  CircularProgress,
  CssBaseline,
  Slider,
  React,
} from "../../../../../sharedimports/share";
interface ImageProps {
  src: string;
  alt: string;
}

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [
    {
      id: 1,
      src: "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FWeb%2520Banner%2Fpanadol-ultra-web-banner.jpg&w=991&q=50",
      alt: "Image 1",
    },
    {
      id: 2,
      src: "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FWeb%2520Banner%2Fgetz-pharma-web.jpg&w=991&q=50",
      alt: "Image 2",
    },
    {
      id: 3,
      src: "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FWeb%2520Banner%2FScotmann-Web-Banner.jpg&w=991&q=50",
      alt: "Image 3",
    },
    {
      id: 4,
      src: "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FWeb%2520Banner%2FZinc-Se-Zindagi-Digital-Content-Nov2024-R1.jpg&w=1400&q=50",
      alt: "Image 4",
    },
  ];

  return (
    <Box className="carousel-container">
      <Slider {...settings}>
        {images.map((image) => (
          <ImageWithLoader key={image.id} src={image.src} alt={image.alt} />
        ))}
      </Slider>
    </Box>
  );
};

const ImageWithLoader: React.FC<ImageProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        minHeight: "300px",
        width: "100%",
      }}
    >
      {isLoading && (
        <CircularProgress
          style={{
            position: "absolute",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        style={{
          display: isLoading ? "none" : "block",
          width: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

const ImageSlider = () => {
  return (
    <>
      <CssBaseline />
      <ImageCarousel />
    </>
  );
};

export default ImageSlider;
