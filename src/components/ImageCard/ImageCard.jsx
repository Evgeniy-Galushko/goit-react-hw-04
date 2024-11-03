import s from "./ImageCard.module.css";

export default function ImageCard({ id, src, alt, handleChange }) {
  return (
    <div>
      <img
        id={id}
        src={src}
        alt={alt}
        onClick={handleChange}
        className={s.img}
      />
    </div>
  );
}
