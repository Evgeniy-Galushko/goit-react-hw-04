import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ fotos, openModal, handleChange }) {
  return (
    <ul className={s.ul}>
      {fotos.map(({ id, urls, asset_type, likes, user }) => {
        return (
          <li key={id} onClick={openModal} className={s.galleryCard}>
            <ImageCard
              id={id}
              likes={likes}
              user={user.name}
              location={user.location}
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
