import s from "./ImageModal.module.css";

export default function BtnUp({ photo }) {
  return <img src={photo.src} alt={photo.alt} className={s.imgMod} />;
}
