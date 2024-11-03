import s from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, children }) {
  return (
    <>
      <button className={s.btn} type="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
}
