import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function Cadastro() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();

    const handleCadastro = (e) => {
        e.preventDefault();
        setErro('');
        setSucesso('');

        if (!usuario || !senha || !confirmarSenha) {
            setErro('Preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }

        // Salva usuário no localStorage (mesmo local usado no login)
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        if (usuarios.find(u => u.usuario === usuario)) {
            setErro('Usuário já existe.');
            return;
        }
        usuarios.push({ usuario, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        setSucesso('Cadastro realizado com sucesso! Redirecionando para login...');
        setTimeout(() => navigate('/login'), 1500);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
            {/* Imagem de fundo */}
            <img
                src="/fundo cadastro e login.jpg"
                alt="Fundo"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            {/* Overlay para escurecer um pouco, opcional */}
            <div className="absolute inset-0 bg-cyan-900 bg-opacity-40 z-0"></div>

            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Control</h1>
                    <h2 className="text-xl text-gray-600">Cadastro</h2>
                </div>
                <form onSubmit={handleCadastro} className="space-y-2">
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
                    <InputCampo
                        type="password"
                        placeholder="Confirmar Senha"
                        value={confirmarSenha}
                        onChange={e => setConfirmarSenha(e.target.value)}
                        iconClass="fas fa-lock"
                    />
                    {erro && (
                        <p className="text-red-500 text-sm text-center">{erro}</p>
                    )}
                    {sucesso && (
                        <p className="text-green-600 text-sm text-center">{sucesso}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                        Cadastrar
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Já tem uma conta?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Faça login aqui
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
