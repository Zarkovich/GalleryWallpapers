import "./style.scss";

function LoadingButton() {
    return (
        <div className='loader'>
            <span className='loader__element'></span>
            <span className='loader__element'></span>
            <span className='loader__element'></span>
        </div>
    );
}
export default LoadingButton;
