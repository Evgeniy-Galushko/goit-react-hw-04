import s from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <>
      <p className={s.p}>Sorry! Something went wrong. Try again later.</p>
    </>
  );
}
