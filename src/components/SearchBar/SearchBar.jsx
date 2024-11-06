import s from "./SearchBar.module.css";
import { FcSearch } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

export default function RequestForm({ handleSubmit }) {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const requestText = form.elements.message.value.trim().toLowerCase();
    if (requestText === "") {
      toast.error("Please enter search term!");
      return;
    }
    handleSubmit(requestText);
  };
  return (
    <header className={s.header} id="up">
      <form className={s.form} onSubmit={onSubmit}>
        <button type="submit" className={s.button}>
          <FcSearch size={30} />
        </button>
        <input
          className={s.input}
          type="text"
          name="message"
          autoComplete="off"
          pattern="^[а-яА-Яa-zA-Z ]{0,100}$"
          title="Введите текст"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
      <div>
        <Toaster
          toastOptions={{
            className: "",
            duration: 3000,
            style: {
              // background: "#0048ff",
              // color: "#fff",
            },
          }}
        />
      </div>
    </header>
  );
}
