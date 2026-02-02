import { motion, AnimatePresence } from 'framer-motion';

export default function BlueprintModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#0a1a0f] border border-beetle-gold/30 w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-[#0a1a0f]/95 backdrop-blur border-b border-beetle-gold/10 p-6 flex justify-between items-center z-10">
                        <h2 className="text-3xl font-black text-white tracking-tighter">
                            <span className="text-beetle-gold">Technical</span> Blueprint
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-12">

                        {/* 1. Architecture Overview */}
                        <section>
                            <h3 className="text-xl font-bold text-beetle-gold mb-4 flex items-center gap-2">
                                <span>🏗️</span> Progressive Launch System
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                To ensure fair distribution and sustainable growth, we are launching in **3 Progressive Stages**.
                                We are currently in **Stage 1 (Seed)**.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 mt-6">
                                <div className="p-4 rounded-xl bg-beetle-gold/20 border border-beetle-gold/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-beetle-gold text-black text-xs font-bold px-2 py-1">LIVE</div>
                                    <div className="font-bold text-white mb-2">Stage 1: Seed</div>
                                    <div className="text-sm text-gray-400">Lowest Entry Price. Funds 100% Liquidity.</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                                    <div className="font-bold text-white mb-2">Stage 2: Early</div>
                                    <div className="text-sm text-gray-500">+10% Price Increase. Finalizing Marketing budget.</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                                    <div className="font-bold text-white mb-2">Stage 3: DEX Launch</div>
                                    <div className="text-sm text-gray-500">Public Listing on PancakeSwap. Liquidity Locked.</div>
                                </div>
                            </div>
                        </section>

                        {/* 2. Safety Mechanisms */}
                        <section>
                            <h3 className="text-xl font-bold text-beetle-gold mb-4 flex items-center gap-2">
                                <span>🛡️</span> Safety Mechanisms
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="min-w-[4px] bg-green-500 rounded-full"></div>
                                    <div>
                                        <h4 className="font-bold text-white">Refund Guarantee</h4>
                                        <p className="text-sm text-gray-400 mt-1">
                                            The Seed Sale contract has a built-in <code className="bg-white/10 px-1 rounded">softCap</code> check.
                                            If we do not raise the minimum liquidity, the contract allows YOU to claim a full refund.
                                            The owner cannot withdraw funds unless the Soft Cap is hit.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="min-w-[4px] bg-green-500 rounded-full"></div>
                                    <div>
                                        <h4 className="font-bold text-white">Code-Enforced Liquidity Lock</h4>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Once the Liquidity Pool is created, the LP tokens are sent to <code className="bg-white/10 px-1 rounded">LiquidityLocker.sol</code>.
                                            This contract has a <code className="bg-white/10 px-1 rounded">lockTime</code> (1 year).
                                            The <code className="bg-white/10 px-1 rounded">withdraw()</code> function literally reverts if called before the unlock date.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="min-w-[4px] bg-green-500 rounded-full"></div>
                                    <div>
                                        <h4 className="font-bold text-white">Anti-Sniper Protection</h4>
                                        <p className="text-sm text-gray-400 mt-1">
                                            For the first 100 blocks (~5 minutes), buys are limited to 1% of supply.
                                            This prevents bots from buying the entire supply instantly at launch.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                    </div>

                    {/* Footer CTA */}
                    <div className="p-6 bg-black/40 border-t border-white/5 text-center">
                        <p className="text-gray-500 text-sm mb-4">
                            Smart Contracts verified on BSCScan.
                        </p>
                        <a
                            href="https://github.com/YourRepo/roll_dung_beetle" // Update with real repo if needed
                            target="_blank"
                            className="inline-flex items-center gap-2 text-beetle-gold hover:text-white transition-colors font-bold"
                        >
                            View Source Code on GitHub →
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
