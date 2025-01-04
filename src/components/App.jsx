import { useState, useEffect } from "react"

const names = [
    "Pikachu", "Charizard", "Bulbasaur", 
    "Squirtle", "Jigglypuff", "Meowth", 
    "Psyduck", "Snorlax", "Gengar", 
    "Eevee", "Mewtwo", "Lucario"
];


export default () => {
    const [score, setScore] = useState(0);
    const [topScore, setTopScore] = useState(0);
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        pokeList(['ditto', 'pikachu', 'charmander']);
    }, [])

    const pokeList = async (endpoints) => {
        let list = [];
        const getList = await Promise.all(endpoints.map(endpoint => fetch(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)));
        getList.map(res => 
            res.json().
            then(data => {
                setPokemon([...list, data]);
                list.push(data)
            }).
            catch(console.error())
        )       
    }

    return (
        <>
            <header className="app-header">
                <h1 className="title">Memory Cards</h1>
                <div className="top-score score">Top Score: <span>{topScore}</span></div>
                <div className="current-score score">Score: <span>{score}</span></div>
            </header>

            <main className="app-main">

            </main>

            <footer className="app-footer"></footer>
        </>
    )
}