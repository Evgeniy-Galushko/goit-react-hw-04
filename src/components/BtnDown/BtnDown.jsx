import s from "./BtnDown.module.css";

export default function BtnDown({ children }) {
  return (
    <>
      <a href="#down" className={s.btnNavDown}>
        {children}
      </a>
    </>
  );
}
