import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexto/AuthContext';

// Componente reutilizável de campo de input
function InputCampo({ type, placeholder, value, onChange, iconClass }) {
    return (
        <div className="relative mb-4">
            {iconClass && <i className={`${iconClass} absolute left-3 top-3 text-gray-400`}></i>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                required
            />
        </div>
    );
}

export default function PaginaLogin() {
    const { login } = useContext(AuthContext);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Busca usuários cadastrados no localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const user = usuarios.find(u => u.usuario === usuario && u.senha === senha);

        if (user) {
            login(usuario); // chama o contexto
            navigate('/lista'); // redireciona para a lista
        } else if (usuario === 'user' && senha === 'user123') {
            localStorage.setItem('usuarioLogado', 'user');
            login('user');
            navigate('/lista');
        } else if (usuario === 'admin' && senha === 'admin123') {
            localStorage.setItem('usuarioLogado', 'admin');
            login('admin');
            navigate('/lista');
        } else {
            setErro('Usuário ou senha inválidos');
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
            {/* Botão de voltar para o início */}
            <button
                onClick={() => navigate('/inicio')}
                className="absolute top-4 left-4 px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-900 shadow z-20"
            >
                ← Início
            </button>
            {/* Imagem de fundo */}
            <img
                src="/fundo cadastro e login.jpg" // coloque sua imagem na pasta public e ajuste o nome
                alt="Fundo"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            {/* Overlay para escurecer um pouco, opcional */}
            <div className="absolute inset-0 bg-cyan-900 bg-opacity-40 z-0"></div>

            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Control
                    </h1>
                    <h2 className="text-xl text-gray-600">Login</h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-2">
                    <InputCampo
                        type="text"
                        placeholder="Usuário"
                        value={usuario}
                        onChange={e => setUsuario(e.target.value)}
                        iconClass="fas fa-user"
                    />
                    <InputCampo
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        iconClass="fas fa-lock"
                    />
                    {erro && (
                        <p className="text-red-500 text-sm text-center">{erro}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <div className="mt-4">
                        <Link
                            to="/cadastro"
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                        >
                            Criar nova conta
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
