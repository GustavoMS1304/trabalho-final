import { Navigate } from 'react-router-dom';

export default function RotaPrivada({ children }) {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!usuarioLogado) {
        return <Navigate to="/login" />;
    }

    // Se tentar acessar rota de admin sendo usuário comum
    if (window.location.pathname.startsWith('/admin') && tipoUsuario !== 'admin') {
        return <Navigate to="/lista" />;
    }

    return children;
}
