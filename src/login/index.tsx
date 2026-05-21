import './style.css'
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { Link } from 'react-router';
import { useState, } from 'react';

function Login() {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, correo, contrasena);
        } catch (error) {
            console.log('Error al iniciar sesión', error);
        }
    };
        
    return (
        <>
            <h3>Email</h3>
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
            <h3>Contraseña</h3>
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
            <br />
            <p>No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
            <Link to="/"><button onClick={handleLogin}>Iniciar sesión</button></Link>
        </>
        )
}

export default Login;
