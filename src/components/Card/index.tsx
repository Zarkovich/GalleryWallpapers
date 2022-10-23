import styles from "./style.module.scss";

type PropsCard = {
    imageUrl: string;
};

function Card({ imageUrl }: PropsCard) {
    return (
        <a href={imageUrl} target='_blank'>
            <div
                className={styles.CardContainer}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                }}
            ></div>
        </a>
    );
}
export default Card;
