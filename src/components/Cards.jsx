import '../styles/cards.css'

export default ({items}) => {
    return (
        <div className="cards">
            <ul className="card-list">
                {
                    items.map(pokemon => 
                        <li key={pokemon.id}>
                            <div className="card" data-id={pokemon.id}>
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