import styles from "./style.module.scss";

type PropsCard = {
    imageUrl: string;
};

function Card({ imageUrl }: PropsCard) {
    return (
        <div
            className={styles.CardContainer}
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
            }}
        ></div>
    );
}
export default Card;
