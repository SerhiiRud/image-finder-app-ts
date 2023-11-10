import PropTypes from "prop-types";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { GalleryContainer } from "./ImageGallery.styled";

export const ImageGallery = ({ images }) => {
  return (
    <GalleryContainer>
      {images.map((image) => (
        <ImageGalleryItem key={image.id} imageData={image}></ImageGalleryItem>
      ))}
    </GalleryContainer>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
};
