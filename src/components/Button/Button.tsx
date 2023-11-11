import { FC } from "react";
import PropTypes from "prop-types";
import { ButtonLoadMore } from "./Button.styled";

type ButtonType = {
  onClick: () => void;
};

export const Button: FC<ButtonType> = ({ onClick }) => {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      Load more
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
