import { Photo } from "../types/photo";
import { storage } from "../Api/firebase";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 as createId } from "uuid";

export const getAll = async () => {
  let list: Photo[] = [];

  const imagesFolder = ref(storage, "images");
  const photoList = await listAll(imagesFolder);

  for (let i in photoList.items) {
    let photoUrl = await getDownloadURL(photoList.items[i]);

    list.push({
      name: photoList.items[i].name,
      url: photoUrl,
    });
  }

  return list;
};

export const uploadAll = async (file: File) => {
  if (["image/jpeg", "image/png"].includes(file.type)) {
    let randomName = createId();

    let newFile = ref(storage, `images/${randomName}.jpeg`);

    let upload = await uploadBytes(newFile, file);

    let photoUrl = await getDownloadURL(upload.ref);

    return {
      name: upload.ref.name,
      url: photoUrl,
    } as Photo;
  } else {
    return new Error("Tipo de arquivo não permitido");
  }
};

export const deletePhoto = async (photo: Photo, photoList: Photo[]) => {
  photoList.forEach(async (item) => {
    if (item.name === photo.name) {
      let refFile = ref(storage, `images/${photo.name}`);

      await deleteObject(refFile);
    }
  });
};
