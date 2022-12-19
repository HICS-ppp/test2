import { Link } from "react-router-dom";

export const About = () => {
    return (
        <>
            <h1>Aboutページです</h1>
            <Link to="/">Homeページに移動</Link>
            <br />
            <Link to="/contact">Contactページに移動</Link>
            <br />
            <Link to="/test">Testページへ</Link>
            <br />
            <Link to="/test2">元Testページへ</Link>
            <br />
            <Link to="/test3">新Testページへ</Link>
            <br />
            <Link to="/google-auth">google-auth</Link>
            <br />
            <Link to="/google-auth2">google-auth2</Link>
                <br />
                <Link to="/google-auth3">google-auth3</Link>


        </>
    );
};