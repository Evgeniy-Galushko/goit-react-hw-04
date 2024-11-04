import { useState, useEffect } from "react";
import { GoChevronUp } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";

import { ProgressBar } from "react-loader-spinner";
import "./App.css";
import RequestForm from "./RequestForm/RequestForm";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "react-modal";
import requestApi from "../request-api";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import SetsearchFieldError from "./SetsearchFieldError/SetsearchFieldError";
import BtnUp from "./BtnUp/BtnUp";
import BtnDown from "./BtnDown/BtnDown";

Modal.setAppElement("#root");

export default function App() {
  const [textMessage, setTextMessage] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchFieldError, setsearchFieldError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [btnLoadIsOpen, setbtnLoadIsOpen] = useState(false);

  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [values, setValues] = useState("");
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setAnswers([]);
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setsearchFieldError(false);
    const form = e.target;
    const requestText = form.elements.message.value.trim().toLowerCase();
    if (requestText === "") {
      setAnswers([]);
      setsearchFieldError(true);
      return;
    }
    setTextMessage(requestText);
  };

  useEffect(() => {
    if (textMessage.length !== 0) {
      async function request() {
        try {
          setAnswers([]);
          setErrorMessage(false);
          setsearchFieldError(false);
          setLoading(true);
          setPages(1);
          const data = await requestApi(textMessage);
          console.log(data.data.results);
          setTotalNumberOfPages(data.data.total_pages);
          setAnswers(data.data.results);
        } catch (error) {
          console.log(error);
          setErrorMessage(true);
        } finally {
          setLoading(false);
        }
      }
      request();
    }
  }, [textMessage, totalNumberOfPages]);

  const handleClick = () => {
    setPages(pages + 1);
  };

  useEffect(() => {
    async function request() {
      try {
        if (textMessage === "") {
          return;
        }
        setLoading(true);
        const data = await requestApi(textMessage, pages);
        setTotalNumberOfPages(data.data.total_pages);
        setAnswers((prevImages) => [...prevImages, ...data.data.results]);
      } catch (error) {
        console.log(error);
        setErrorMessage(true);
      } finally {
        setLoading(false);
      }
    }
    request();
  }, [textMessage, pages]);
  console.log(pages);

  const handleChange = (value) => {
    const id = value.target.id;
    const filters = answers
      .filter((answer) => answer.id === id)
      .map((answer) => answer.urls.regular);
    setValues(filters[0]);
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

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={values} width={650} height={800} />
      </Modal>
      <RequestForm onSubmit={handleSubmit} />
      {searchFieldError && <SetsearchFieldError />}
      {errorMessage ? (
        <ErrorMessage />
      ) : (
        <ImageGallery
          fotos={answers}
          openModal={openModal}
          handleChange={handleChange}
        />
      )}
      {loading && (
        <ProgressBar
          visible={true}
          height="80"
          width="120"
          color="#06f42c"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progressar"
        />
      )}
      {pages < totalNumberOfPages && (
        <LoadMoreBtn onClick={handleClick}>Load more</LoadMoreBtn>
      )}
      {pages >= 2 && (
        <BtnUp>
          <GoChevronUp size={20} />
        </BtnUp>
      )}
      {pages >= 2 && (
        <BtnDown>
          <GoChevronDown size={20} />
        </BtnDown>
      )}
    </>
  );
}
