import { TImage } from "../../types/image";
import { Component, MouseEventHandler } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalWindow } from "./Modal.styled";

type TProps = {
  modalData: TImage;
  onModalClose: () => void;
  modalInfo: boolean;
};

const modalRoot = document.getElementById("modal-root")!;

export class Modal extends Component<TProps> {
  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  onBackdropClick: MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent
  ) => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };

  onKeyDown = (e: KeyboardEvent) => {
    if (e.code === `Escape`) {
      this.props.onModalClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalData;
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
