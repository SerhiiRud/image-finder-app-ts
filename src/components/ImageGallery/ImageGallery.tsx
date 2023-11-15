import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { GalleryContainer } from "./ImageGallery.styled";
import { TImage } from "../../types/image";

export const ImageGallery = ({ images }: { images: TImage[] }) => {
  return (
    <GalleryContainer>
      {images.map((image) => (
        <ImageGalleryItem key={image.id} imageData={image}></ImageGalleryItem>
      ))}
    </GalleryContainer>
  );
};
