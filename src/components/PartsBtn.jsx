function PartsBtn(PartsId, Key, imgUrl) {
    return (
        <button onClick={() => { PartsId.call(Key); }}>
            <img src={ imgUrl } />
        </button>
    )
}

export { PartsBtn }; 