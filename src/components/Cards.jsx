import '../styles/cards.css'

export default ({items, memory, setMemory, topScore, setTopScore}) => {
    function handleClick(e) {
        for (let id of memory) {
            if (id === e.target.dataset.id) {
                if (topScore < memory.length) setTopScore(memory.length);
                setMemory([]);
                return;
            }
        }
        setMemory([...memory, e.target.dataset.id]);
    }

    return (
        <div className="cards">
            <ul className="card-list">
                {
                    items.map(pokemon => 
                        <li key={pokemon.id}>
                            <div 
                                className="card"
                                data-id={pokemon.id}
                                onClick={handleClick}
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