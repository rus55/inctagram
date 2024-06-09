import Image from "next/image";
import s from "./UploadedPhotos.module.scss";

type Props = {
  photos: ImagePost[]
}
export const UploadedPhotos = ({ photos }: Props) => {
  const rows = [];
  for (let i = 0; i < photos.length; i += 4) {
    rows.push(photos.slice(i, i + 4));
  }

  return (
    <table className={s.table}>
      <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((photo) => (
            <td key={photo.id}>
              <Image src={photo.url} alt={"img"} width={photo.width} height={photo.height} />
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
};