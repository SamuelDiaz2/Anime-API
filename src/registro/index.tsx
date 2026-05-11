import './style.css'

import { Link } from 'react-router';
import { useState, } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

function Registro() {

const [nombre, setNombre] = useState('');
const [correo, setCorreo] = useState('');
const [contrasena, setContrasena] = useState('');

const handleRegistro = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
        const user = userCredential.user;
        // 🔁 Guardar datos en Firestore con el mismo UID como ID del documento
        await setDoc(doc(db, 'usuarios', user.uid), {
            uid: user.uid,
            nombre,
            correo,
        });

        console.log('Éxito', 'Usuario registrado correctamente');
        } catch (error) {
            console.log('Error al registrarse', error);
        }
    }

    return (
        <>
            <h3>Nombre</h3>
            <input type="text" onChange={}/>
            <h3>Email</h3>
            <input type="email"/>
            <h3>Contraseña</h3>
            <input type="password"/>
            <br />
            <Link to="/"><button onClick={handleRegistro}>registrarse</button></Link>
        </>

    )
}

export default Registro;
