import { useState, useEffect } from "react"
import Cards from "./Cards"
import '../styles/app.css'

export default () => {
    const [memory, setMemory] = useState([]);
    const [topScore, setTopScore] = useState(0);
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        pokeList(['ditto', 'pikachu', 'charmander']);
    }, [])

    const pokeList = async (endpoints) => {
        let list = [];
        const getList = await Promise.all(endpoints.map(endpoint => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)
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
                        topScore={topScore}
                        setTopScore={setTopScore}
                    />
                }
            </main>

            <footer className="app-footer"></footer>
        </>
    )
}