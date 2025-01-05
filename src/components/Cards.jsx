import '../styles/cards.css'

export default ({items, memory, setMemory, updateTopScore, max}) => {
    function handleClick(e) {
        for (let id of memory) {
            if (id === e.target.dataset.id) {
                updateTopScore(memory.length);
                return;
            }
        }
        setMemory([...memory, e.target.dataset.id]);
        if (memory.length === (max - 1)) updateTopScore(memory.length+1);
    }

    function handleKeydown(e) {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar")
            handleClick(e);
    }

    return (
        <div className="cards">
            <ul className="card-list">
                {
                    items.map(pokemon => 
                        <li key={pokemon.id}>
                            <div 
                                role="button"
                                aria-pressed="false"
                                tabIndex={0}
                                className="card"
                                data-id={pokemon.id}
                                onClick={handleClick}
                                onKeyDown={handleKeydown}
                            >
                                <div className="img-container">
                                <img src={pokemon.image} alt="" className='card-img' />
                                </div>
                                <h2 className="name">{pokemon.name}</h2>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}