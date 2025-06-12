import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuarioLogado, setUsuarioLogado] = useState(localStorage.getItem('usuarioLogado') || null);

    function login(usuario) {
        setUsuarioLogado(usuario);
        localStorage.setItem('usuarioLogado', usuario);
    }

    function logout() {
        setUsuarioLogado(null);
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('tipoUsuario');
    }

    // Aqui está a propriedade autenticado:
    const autenticado = !!usuarioLogado;

    return (
        <AuthContext.Provider value={{ usuarioLogado, autenticado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
