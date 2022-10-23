import { useState } from "react";
import { uploadAll } from "../../services/photos";
import Card from "../Card";
import LoadingButton from "../LoadingIcon";
import styles from "./style.module.scss";

function AddCard() {
    const [upLoading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    function preview(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files == null) return;
        const file = e.target.files[0];

        setImagePreview(() => URL.createObjectURL(file));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get("image") as File;

        if (file && file.size > 0) {
            setUploading(true);
            let result = await uploadAll(file);
            setUploading(false);

            if (result instanceof Error) {
                alert(`${result.name} - ${result.message}`);
            } else {
                window.location.reload();
            }
        }
    }

    return (
        <form method='POST' onSubmit={handleSubmit} className={styles.Form}>
            <label className={styles.AddPhoto}>
                {!!imagePreview || <span className={styles.AddButton}>+</span>}
                <Card imageUrl={imagePreview} />
                <input
                    name='image'
                    type='file'
                    accept='image/png, image/jpeg'
                    className={styles.Input}
                    onChange={preview}
                />
            </label>
            <button type='submit' className={styles.Button}>
                {upLoading ? <LoadingButton /> : "Adicionar"}
            </button>
        </form>
    );
}
export default AddCard;
