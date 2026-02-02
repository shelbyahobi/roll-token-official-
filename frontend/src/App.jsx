import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Hero from './components/Hero';
import SeedSale from './components/SeedSale';
import Transparency from './components/Transparency';
import BlueprintModal from './components/BlueprintModal';

function App() {
    const [showBlueprint, setShowBlueprint] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-beetle-gold selection:text-black relative overflow-hidden">

            <BlueprintModal isOpen={showBlueprint} onClose={() => setShowBlueprint(false)} />

            {/* --- Ambient Background Effects --- */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#050a05] via-[#0a1a0f] to-black"></div>

            {/* Animated Glow Orbs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-beetle-green/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-beetle-gold/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

            {/* Content Wrapper */}
            <div className="relative z-10">

                {/* --- Navbar --- */}
                <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">

                        {/* Logo Area */}
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative">
                                <div className="absolute inset-0 bg-beetle-gold/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src="/logo_eco.jpg"
                                    alt="ROLL"
                                    className="w-10 h-10 rounded-full border border-beetle-gold/50 relative z-10"
                                />
                            </div>
                            <div className="text-2xl font-black text-white tracking-tighter group-hover:text-beetle-gold transition-colors">
                                $ROLL
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex gap-6 text-sm font-bold text-gray-400">
                                <a href="https://t.me/ROLLToken" target="_blank" className="flex items-center gap-2 hover:text-beetle-gold hover:scale-105 transition-all">
                                    <span>✈️</span> Telegram
                                </a>
                                <a href="https://x.com/roll_token" target="_blank" className="flex items-center gap-2 hover:text-beetle-gold hover:scale-105 transition-all">
                                    <span>𝕏</span> Twitter
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); setShowBlueprint(true); }} className="flex items-center gap-2 hover:text-beetle-gold hover:scale-105 transition-all">
                                    <span>📸</span> Instagram
                                </a>
                                <button onClick={() => setShowBlueprint(true)} className="flex items-center gap-2 hover:text-beetle-gold hover:scale-105 transition-all cursor-pointer">
                                    <span>📄</span> Blueprint
                                </button>
                            </div>
                            <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
                        </div>
                    </div>
                </nav>

                {/* --- Main Content --- */}
                <main className="pt-20">
                    <Hero onOpenBlueprint={() => setShowBlueprint(true)} />

                    <div className="container mx-auto px-4 py-20 space-y-24">
                        <SeedSale />
                        <Transparency />
                    </div>
                </main>

                {/* --- Footer --- */}
                <footer className="py-12 border-t border-white/5 bg-black/50 backdrop-blur-sm">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-3xl font-black text-beetle-gold mb-4 tracking-tighter">$ROLL</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                            Bridging meme culture with real-world organic commerce.
                            Run by the community, for the community.
                        </p>
                        <div className="flex justify-center gap-8 mb-8">
                            <a href="https://x.com/roll_token" target="_blank" className="text-gray-400 hover:text-beetle-gold transition-colors">Twitter (X)</a>
                            <a href="https://instagram.com/ROLLToken" target="_blank" className="text-gray-400 hover:text-beetle-gold transition-colors">Instagram</a>
                            <a href="https://t.me/rolltoken" target="_blank" className="text-gray-400 hover:text-beetle-gold transition-colors">Telegram</a>
                            <a href="#" className="text-gray-400 hover:text-beetle-gold transition-colors">Etherscan</a>
                        </div>
                        <p className="text-gray-700 text-sm">&copy; 2026 ROLL Token. Organic Commerce.</p>
                    </div>
                </footer>

            </div>
        </div>
    )
}

export default App
