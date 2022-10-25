import Card from "./components/Card";
import "./GlobalStyles.scss";
import styles from "./App.module.scss";
import AddCard from "./components/AddCard";
import { useEffect, useState } from "react";
import { Photo } from "./types/photo";
import Loading from "./components/Loading";
import { getAll } from "./services/photos";
import ModalImage from "./components/ModalImage";

function App() {
    const [loading, setLoading] = useState(false);
    const [photoList, setPhotoList] = useState<Photo[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [photoData, setPhotoData] = useState({
        name: "",
        url: "",
    });

    useEffect(() => {
        const getAllPhotos = async () => {
            setLoading(true);
            setPhotoList(await getAll());
            setLoading(false);
        };
        getAllPhotos();
    }, []);

    function showModal(image: Photo) {
        setPhotoData(image);
        setIsOpenModal(true);
        console.log(`url = ${photoData.url}  name= ${photoData.name}`);
    }

    function closeModal(e: React.MouseEvent<HTMLDivElement>) {
        if (e.currentTarget === e.target) setIsOpenModal(false);

        console.log(e.target);
    }

    return (
        <div>
            <h1 className={styles.Title}>Gallery of Wallpapers</h1>

            <AddCard />

            {loading && <Loading />}

            {!loading && photoList.length > 0 && (
                <div className={styles.PhotoContainer}>
                    {photoList.map((item, idx) => (
                        <div key={idx} onClick={() => showModal(item)}>
                            <Card imageUrl={item.url} />
                        </div>
                    ))}
                </div>
            )}

            {!loading && photoList.length === 0 && (
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                    Não há foto 😒
                </h1>
            )}

            {isOpenModal && (
                <ModalImage
                    name={photoData.name}
                    url={photoData.url}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}
export default App;
