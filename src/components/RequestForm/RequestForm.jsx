import s from "./RequestForm.module.css";
import { FcSearch } from "react-icons/fc";

export default function RequestForm({ onSubmit }) {
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
    </header>
  );
}
