import { useState, useEffect } from "react";
import { GoChevronUp } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";

import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "react-modal";
import requestApi from "../request-api";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import SetsearchFieldError from "./SetsearchFieldError/SetsearchFieldError";
import BtnUp from "./BtnUp/BtnUp";
import BtnDown from "./BtnDown/BtnDown";
import Loader from "./Loader/Loader";
import ImageModal from "./ImageModal/ImageModal";

Modal.setAppElement("#root");

export default function App() {
  const [textMessage, setTextMessage] = useState("");
  const [photoCollection, setPhotoCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchFieldError, setSearchFieldError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [btnLoadIsOpen, setbtnLoadIsOpen] = useState(false);

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [modalPhoto, setModalPhoto] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPhotoCollection([]);
  }, []);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPhotoCollection([]);
    setErrorMessage(false);
    setSearchFieldError(false);
    setPage(1);
    setSearchFieldError(false);
    const form = e.target;
    const requestText = form.elements.message.value.trim().toLowerCase();
    if (requestText === "") {
      setPhotoCollection([]);
      setSearchFieldError(true);
      return;
    }
    setTextMessage(requestText);
  };

  const handleClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    async function request() {
      try {
        if (textMessage === "") {
          return;
        }
        setLoading(true);
        if (!textMessage) return;
        const data = await requestApi(textMessage, page);
        setTotalNumberOfPages(data.data.total_pages);
        setPhotoCollection((prevImages) => [
          ...prevImages,
          ...data.data.results,
        ]);
      } catch (error) {
        console.log(error);
        setErrorMessage(true);
      } finally {
        setLoading(false);
      }
    }
    request();
  }, [textMessage, page]);

  const handleChange = (modalData) => {
    setModalIsOpen(true);
    setModalPhoto(modalData);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "",
      transform: "translate(-50%, -50%)",
    },
  };

  console.log(page);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ImageModal photo={modalPhoto} />
      </Modal>
      <SearchBar onSubmit={handleSubmit} />
      {searchFieldError && <SetsearchFieldError />}
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <ImageGallery
          fotos={photoCollection}
          openModal={openModal}
          handleChange={handleChange}
        />
      )}
      {loading && <Loader />}
      {page < totalNumberOfPages && (
        <LoadMoreBtn onClick={handleClick}>Load more</LoadMoreBtn>
      )}
      {page >= 2 && (
        <BtnUp>
          <GoChevronUp size={20} />
        </BtnUp>
      )}
      {page >= 2 && (
        <BtnDown>
          <GoChevronDown size={20} />
        </BtnDown>
      )}
    </>
  );
}
