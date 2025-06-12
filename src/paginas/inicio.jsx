import { Link, useNavigate } from 'react-router-dom';

export default function Inicio() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
            {/* Botão de voltar para o início */}
           
            <div className="hero min-h-[80vh] flex items-center justify-center text-center px-4 relative">
                {/* Imagem de fundo */}
                <img
                    src="/logo.jpg"
                    alt="Logo do Control"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none z-0"
                />
                {/* Quadrado branco translúcido à direita */}    
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-8 w-full max-w-md bg-white bg-opacity-70 rounded-lg shadow-lg p-10 text-gray-900 z-10 text-left">
                    <h1 className="text-4xl font-bold mb-4">Bem vindo ao Control</h1>
                    <p className="text-lg mb-8 opacity-90">
                        Sua plataforma pessoal para controle de gastos!
                    </p>
                    <Link 
                        to="/login" 
                        className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                        Acessar Sistema
                    </Link>
                </div>
            </div>

            <section className="py-16 bg-white text-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Recursos</h2>
                    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-12">
                        {/* Coluna de ícones e textos */}
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="flex items-center gap-4">
                                <i className="fas fa-book-open text-4xl text-red-500"></i>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Gastos</h3>
                                    <p className="text-gray-600">Gerencie e veja o controle de seus gasto</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <i className="fas fa-tags text-4xl text-red-500"></i>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Prioridades</h3>
                                    <p className="text-gray-600">Organize suas prioridades por categorias</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <i className="fas fa-users text-4xl text-red-500"></i>
                                <div>
                                    <h3 className="text-xl font-semibold mb-1">Usuários</h3>
                                    <p className="text-gray-600">Acesso Pessoal Protegido por nós!</p>
                                </div>
                            </div>
                        </div>
                        {/* Imagem à direita */}
                        <div className="flex-1 flex justify-center">
                            <img
                                src="/agenda.png" // coloque sua imagem na pasta public
                                alt="Recursos"
                                className="w-full max-w-lg rounded-lg shadow-lg object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer
                style={{
                    width: '100%',
                    background: '#0e7490',
                    color: 'white',
                    textAlign: 'center',
                    padding: '18px 0',
                    fontFamily: 'Times New Roman, Times, serif',
                    fontSize: 16,
                    letterSpacing: 1,
                    marginTop: 'auto'
                }}
            >
                © {new Date().getFullYear()} Control - Seu Gerenciador de Gastos Pessoais
            </footer>
        </div>
    );
}
