import { Component } from "react";
import { TImage } from "../../types/image";
import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";
import { Modal } from "../Modal/Modal";

type TProps = {
  imageData: TImage;
};

type TState = {
  isModalShown: boolean;
  imageData: { largeImageURL: string; tags: string };
};

export class ImageGalleryItem extends Component<TProps, TState> {
  state = {
    isModalShown: false,
    imageData: { largeImageURL: "", tags: "" },
  };

  onModalShow = (imageData: { largeImageURL: string; tags: string }) => {
    this.setState({ imageData, isModalShown: true });
  };

  onModalClose = () => {
    this.setState({ isModalShown: false });
  };

  render() {
    const { largeImageURL, webformatURL, tags } = this.props.imageData;
    return (
      <GalleryItem>
        <>
          <GalleryItemImage
            onClick={(e) => {
              e.preventDefault();
              this.onModalShow({ largeImageURL, tags });
            }}
            src={webformatURL}
            alt={tags}
          />
          {this.state.isModalShown && (
            <Modal
              modalData={this.props.imageData}
              onModalClose={this.onModalClose}
              modalInfo={this.state.isModalShown}
            />
          )}
        </>
      </GalleryItem>
    );
  }
}
