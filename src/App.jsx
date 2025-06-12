import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexto/AuthContext';
import { useContext } from 'react';
import PaginaInicio from './paginas/Inicio';
import PaginaLogin from './paginas/Login';
import ListaUsuario from './paginas/lista';
import Cadastro from './paginas/cadastro';


function RotaPrivada({ children }) {
    const { autenticado } = useContext(AuthContext);

    if (!autenticado) {
        return <Navigate to="/login" />;
    }

    return children;
}

function RotaPublica({ children }) {
    const { autenticado } = useContext(AuthContext);

    if (autenticado) {
        return <Navigate to="/lista" />;
    }

    return children;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <RotaPublica>
                                <PaginaInicio />
                            </RotaPublica>
                        } 
                    />
                    <Route 
                        path="/login" 
                        element={
                            <RotaPublica>
                                <PaginaLogin />
                            </RotaPublica>
                        } 
                    />
                    <Route 
                        path="/cadastro" 
                        element={
                            <RotaPublica>
                                <Cadastro />
                            </RotaPublica>
                        } 
                    />
                    <Route 
                        path="/lista" 
                        element={
                            <RotaPrivada>
                                <ListaUsuario /> {/* ou ListaReceitasUsuario, depende do nome do seu componente */}
                            </RotaPrivada>
                        } 
                    />
                    <Route path="/inicio" element={<PaginaInicio />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
