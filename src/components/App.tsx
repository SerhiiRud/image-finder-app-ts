import { Component } from "react";
import { AxiosResponse } from "axios";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { AppContainer } from "./App.styled";
import { getImages } from "../services/API";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { TImage } from "../types/image";

type TProps = {
  children: React.ReactNode;
};

type TState = {
  searchTerm: string;
  images: TImage[];
  status: string;
  isLoading: boolean;
  page: number;
  totalPages: number;
  error: null | string;
};

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const ERROR_MSG = "Error happend";

export class App extends Component<TProps, TState> {
  state = {
    searchTerm: "",
    images: [],
    status: "idle",
    isLoading: false,
    page: 1,
    totalPages: 0,
    error: null,
  };

  async componentDidUpdate(prevProps: TProps, prevState: TState) {
    if (
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          status: Status.PENDING,
          isLoading: true,
        });

        const result: AxiosResponse<any, any> | undefined = await getImages(
          this.state.searchTerm,
          this.state.page
        );
        if (result?.data.totalHits === 0) {
          return this.setState({
            images: [],
            status: Status.REJECTED,
          });
        }

        if (result) {
          this.setState({
            images:
              prevState.searchTerm === this.state.searchTerm
                ? [...prevState.images, ...result.data.hits]
                : [...result.data.hits],
            status: Status.RESOLVED,
            totalPages: Math.floor(result.data.totalHits / 12),
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          this.setState({ error: ERROR_MSG });
        }
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  searchHandler = (inputValue: string) => {
    this.setState({ searchTerm: inputValue, images: [], page: 1 }); //added images, page
  };

  onLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status, isLoading, page, totalPages, error } =
      // : {
      // images: TImage[];
      // status: string;
      // isLoading: boolean;
      // page: number;
      // totalPages: number;
      // error: null | string;
      // }
      this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.searchHandler} />
        {isLoading && <Loader />}
        {this.state.status === "rejected" && (
          <div>
            Sorry, there are no images matching your search query. Please try
            again.
          </div>
        )}
        {error && <div>{error}</div>}
        <ImageGallery images={images} />
        {images.length > 0 && status !== "pending" && page <= totalPages && (
          <Button onClick={this.onLoadMore} />
        )}
      </AppContainer>
    );
  }
}
