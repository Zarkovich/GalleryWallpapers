import Card from "./components/Card";
import "./GlobalStyles.scss";
import styles from "./App.module.scss";
import AddCard from "./components/AddCard";
import { useEffect, useState } from "react";
import { Photo } from "./types/photo";
import Loading from "./components/Loading";
import { getAll } from "./services/photos";

function App() {
    const [loading, setLoading] = useState(false);
    const [photoList, setPhotoList] = useState<Photo[]>([]);

    useEffect(() => {
        const getAllPhotos = async () => {
            setLoading(true);
            setPhotoList(await getAll());
            setLoading(false);
        };
        getAllPhotos();
    }, []);

    return (
        <div>
            <h1 className={styles.Title}>Gallery of Wallpapers</h1>

            <AddCard />

            {loading && <Loading />}

            {!loading && photoList.length > 0 && (
                <div className={styles.PhotoContainer}>
                    {photoList.map((item, idx) => (
                        <Card imageUrl={item.url} key={idx} />
                    ))}
                </div>
            )}

            {!loading && photoList.length === 0 && (
                <h1 style={{ display: "flex", justifyContent: "center" }}>
                    Não há foto 😒
                </h1>
            )}
        </div>
    );
}
export default App;
