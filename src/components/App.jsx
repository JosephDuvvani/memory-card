import { useState, useEffect, useRef } from "react"
import Cards from "./Cards"
import '../styles/app.css'

const names = [
    "Pikachu", "Charizard", "Bulbasaur", 
    "Squirtle", "Jigglypuff", "Meowth", 
    "Psyduck", "Snorlax", "Gengar", 
    "Eevee", "Mewtwo", "Lucario"
];

export default () => {
    const [memory, setMemory] = useState([]);
    const [topScore, setTopScore] = useState(0);
    const [pokemon, setPokemon] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        pokeList(names);
    }, [])

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.tabIndex = 0;
            modalRef.current.focus();
        }
    }, [gameOver])

    const pokeList = async (endpoints) => {
        let list = [];
        const getList = await Promise.all(endpoints.map(endpoint => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${endpoint.toLowerCase()}`)
        ));
        getList.map(res => 
            res.json().
            then(data => {
                const item = {
                    id: data.id,
                    name: data.name,
                    image: data.sprites.other.dream_world.front_default
                }
                setPokemon([...list, item]);
                list.push(item)
            }).
            catch(console.error())
        )       
    }

    const updateTopScore = (score) => {
        if (topScore < score) setTopScore(score);
        setGameOver(true);
    }

    const closeModal = () => {
        setGameOver(false);
        setMemory([]);
    }

    const handleKeydown = (e) => {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar")
            closeModal();
    }

    return (
        <>
            <header className="app-header">
                <h1 className="title">Memory Cards</h1>
                <div className="top-score score">Top Score: <span>{topScore}</span></div>
                <div className="current-score score">Score: <span>{memory.length}</span></div>
            </header>

            <main className="app-main">
                {pokemon.length > 0 &&
                    <Cards 
                        items={pokemon}
                        memory={memory}
                        setMemory={setMemory}
                        updateTopScore={updateTopScore}
                        max={names.length}
                    />
                }
            </main>

            <footer className="app-footer"></footer>

            {gameOver &&
                <div
                    role="button"
                    aria-pressed="false"
                    tabIndex={-1}
                    className="modal" 
                    onClick={closeModal}
                    onKeyDown={handleKeydown}
                    ref={modalRef}
                >
                    <div className="modal-content">
                        {memory.length === names.length ?
                            <div className="modal-text modal-text_perfect">
                                You Have Perfect Memory
                            </div> :
                            <div className="modal-text">Memory Score</div>
                        }
                        <div className="modal-score">{memory.length}</div>
                    </div>
                </div>
            }
        </>
    )
}