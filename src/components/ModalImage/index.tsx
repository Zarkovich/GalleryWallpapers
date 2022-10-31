import React from 'react';
import { Photo } from '../../types/photo';
import styles from './style.module.scss';

interface PhotoModal extends Photo {
    closeModal: (e: React.MouseEvent<HTMLDivElement>) => void;
    deleteButton: (
        e: React.MouseEvent<HTMLParagraphElement>,
        photo: Photo
    ) => void;
}

function ModalImage(image: PhotoModal) {
    return (
        <div className={styles.Container} onClick={image.closeModal}>
            <span onClick={image.closeModal}>X</span>
            <a href={image.url} target='_blank'>
                <img src={image.url} alt={image.name} />
                <p
                    className={styles.deleteButton}
                    onClick={(e) => image.deleteButton(e, image)}
                >
                    Delete Imagem
                </p>
            </a>
        </div>
    );
}
export default ModalImage;
