import { FC } from "react";
import {
  SearchContainer,
  SearchForm,
  SearchButton,
  SearchInput,
  ButtonLabel,
} from "./Searchbar.styled";

type SearchBarType = {
  onSubmit: (inputValue: string) => void;
};

export const Searchbar: FC<SearchBarType> = ({ onSubmit }) => {
  return (
    <SearchContainer>
      <SearchForm
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit((e.currentTarget.elements[1] as HTMLInputElement).value);
          e.currentTarget.reset();
        }}
      >
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchContainer>
  );
};
