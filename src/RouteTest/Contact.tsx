import { Link } from "react-router-dom"

export const Contact = () => {
    return (
        <>
            <h1>Contactページです</h1>
            <Link to="/">Homeページに移動</Link>
            <br />
            <Link to="/about">Aboutページに移動</Link>
        </>
    );
};