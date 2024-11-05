import s from "./BtnUp.module.css";

export default function BtnUp({ children }) {
  return (
    <a href="#up" className={s.btnNavUp}>
      {children}
    </a>
  );
}
