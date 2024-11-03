import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ fotos, openModal, handleChange }) {
  return (
    <ul className={s.ul}>
      {fotos.map(({ id, urls, asset_type }) => {
        return (
          <li key={id} onClick={openModal}>
            <ImageCard
              id={id}
              src={urls.small}
              alt={asset_type}
              handleChange={handleChange}
            />
          </li>
        );
      })}
    </ul>
  );
}
