import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function ListaUsuario() {
    const [gastos, setGastos] = useState(() => {
        const usuario = localStorage.getItem('usuarioLogado');
        if (!usuario) return [];
        return JSON.parse(localStorage.getItem(`gastos_${usuario}`) || '[]');
    });
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [orcamento, setOrcamento] = useState(() => {
        const usuario = localStorage.getItem('usuarioLogado');
        if (!usuario) return '';
        return localStorage.getItem(`orcamento_${usuario}`) || '';
    });

    useEffect(() => {
        const usuario = localStorage.getItem('usuarioLogado');
        if (usuario) {
            localStorage.setItem(`gastos_${usuario}`, JSON.stringify(gastos));
        }
    }, [gastos]);

    useEffect(() => {
        const usuario = localStorage.getItem('usuarioLogado');
        if (usuario) {
            localStorage.setItem(`orcamento_${usuario}`, orcamento);
        }
    }, [orcamento]);

    function handleLogout() {
        localStorage.removeItem('usuarioLogado');
        window.location.href = '/login';
    }

    function adicionarGasto(e) {
        e.preventDefault();
        if (!descricao.trim() || !valor || isNaN(Number(valor))) return;
        setGastos([...gastos, { descricao, valor: Number(valor) }]);
        setDescricao('');
        setValor('');
    }

    function removerGasto(idx) {
        setGastos(gastos.filter((_, i) => i !== idx));
    }

    const total = gastos.reduce((acc, g) => acc + g.valor, 0);
    const restante = orcamento ? Number(orcamento) - total : null;

    const pizzaData = gastos.length > 0
        ? gastos.map(g => ({
            title: g.descricao,
            value: g.valor,
            color: '#' + Math.floor(Math.random()*16777215).toString(16)
        }))
        : [{ title: 'Sem dados', value: 1, color: '#ddd' }];

    return (
        <div className="min-h-screen w-full bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/fundo cadastro e login.jpg')" }}>
            {/* Botões no topo */}
            <div className="w-full flex justify-between items-center px-8 pt-6 relative z-20">
                <button
                    className="bg-cyan-500 text-white border-none rounded-md px-5 py-2 font-semibold cursor-pointer"
                    onClick={() => window.location.href = '/inicio'}
                >
                    Início
                </button>
                <button
                    className="bg-red-500 text-white border-none rounded-md px-5 py-2 font-semibold cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Faixa branca centralizada ocupando 80% da tela */}
            <main className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-full bg-white min-h-[80vh] mx-auto shadow-lg rounded-none flex flex-col items-center justify-start py-12 transition-all duration-300">
                    <h2 className="text-cyan-700 text-2xl font-bold mb-8 font-serif">
                        Seus Gastos
                    </h2>

                    {/* Campo para estipular o orçamento */}
                    <form
                        onSubmit={e => { e.preventDefault(); }}
                        className="flex gap-3 mb-6 items-center"
                    >
                        <label className="font-semibold text-cyan-700 font-serif">Orçamento:</label>
                        <input
                            type="number"
                            value={orcamento}
                            onChange={e => setOrcamento(e.target.value)}
                            placeholder="Defina seu orçamento"
                            className="py-2 px-4 border border-gray-300 rounded-md text-base min-w-[120px] outline-none font-serif"
                        />
                        <span className="text-gray-500 text-sm font-serif">R$</span>
                    </form>

                    <form onSubmit={adicionarGasto} className="flex gap-3 mb-8">
                        <input
                            type="text"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            placeholder="Descrição"
                            className="py-2 px-4 border border-gray-300 rounded-md text-base min-w-[180px] outline-none font-serif"
                        />
                        <input
                            type="number"
                            value={valor}
                            onChange={e => setValor(e.target.value)}
                            placeholder="Valor"
                            className="py-2 px-4 border border-gray-300 rounded-md text-base min-w-[100px] outline-none font-serif"
                        />
                        <button
                            type="submit"
                            className="bg-cyan-500 text-white border-none rounded-md px-6 py-2 font-semibold text-base cursor-pointer font-serif"
                        >
                            Adicionar
                        </button>
                    </form>
                    <ul className="w-full max-w-xl list-none p-0">
                        {gastos.map((g, i) => (
                            <li
                                key={i}
                                className="bg-slate-100 mb-3 px-5 py-3 rounded-md flex items-center justify-between text-lg font-serif"
                            >
                                <span>{g.descricao} - <b>R$ {g.valor.toFixed(2)}</b></span>
                                <button
                                    onClick={() => removerGasto(i)}
                                    className="bg-red-500 text-white border-none rounded px-3 py-1 font-semibold cursor-pointer ml-4"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                        {gastos.length === 0 && (
                            <li className="text-gray-500 text-center mt-6 font-serif">
                                Nenhum gasto adicionado ainda.
                            </li>
                        )}
                    </ul>
                    <div className="mt-8 text-xl font-bold text-cyan-700 font-serif">
                        Total: R$ {total.toFixed(2)}
                        {orcamento && (
                            <span className={`ml-6 font-semibold ${restante < 0 ? 'text-red-500' : 'text-cyan-700'}`}>
                                Orçamento: R$ {Number(orcamento).toFixed(2)} | Restante: R$ {restante.toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Gráfico de Pizza Empresarial */}
                    <div className="w-full max-w-lg mt-10 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                        <h3 className="text-cyan-700 text-xl font-bold mb-6 font-serif">
                            Distribuição dos Gastos
                        </h3>
                        <PieChart
                            data={pizzaData}
                            label={({ dataEntry }) => dataEntry.title}
                            labelStyle={{
                                fontSize: '6px',
                                fill: '#fff',
                                fontFamily: 'Times New Roman, Times, serif',
                                fontWeight: 700,
                            }}
                            radius={40}
                        />
                    </div>
                </div>
            </main>
            {/* Footer */}
            <footer
                className="w-full bg-cyan-700 text-white text-center py-4 font-serif text-base tracking-wide mt-auto"
            >
                © {new Date().getFullYear()} Control - Seu Gerenciador de Gastos Pessoais
            </footer>
        </div>
    );
}
