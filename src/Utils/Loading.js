export const Loading = ({ onLoad = false }) => {
    return (
        <>
            {onLoad && (
                <div className="overlay-load">
                    <div class="dashed-loading"></div>
                </div>
            )}
        </>
    );
};
