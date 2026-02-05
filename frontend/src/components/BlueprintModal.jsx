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

                        {/* 1. Executive Summary */}
                        <section>
                            <h3 className="text-xl font-bold text-beetle-gold mb-3">1. Executive Summary</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Modern infrastructure is fragile. <strong>$ROLL (Dung Beetle)</strong> is a decentralized protocol designed to fund, facilitate, and discount the transition to an off-grid lifestyle.
                                By combining "hard-coded" smart contract security with a real-world marketplace for self-sufficiency gear, $ROLL provides a hedge against inflation and system failure.
                            </p>
                        </section>

                        {/* 2. The Metaphor */}
                        <section>
                            <h3 className="text-xl font-bold text-beetle-gold mb-3">2. The Metaphor: Why the Dung Beetle?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                The Dung Beetle is nature’s most resilient engineer. It thrives in harsh conditions, building its world from what others ignore.
                                $ROLL adopts this philosophy: we build a solid, <strong>"un-ruggable" foundation (The Ball)</strong> and roll it toward total independence (The Colony).
                            </p>
                        </section>

                        {/* 3. The Utility */}
                        <section>
                            <h3 className="text-xl font-bold text-beetle-gold mb-4">3. The Utility: Gated Marketplace</h3>
                            <p className="text-gray-400 mb-4">The $ROLL token is the "Membership Card" for our Off-Grid Shop.</p>
                            <div className="space-y-3">
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center">
                                    <div>
                                        <span className="text-beetle-gold font-bold block">Tier 1 (Scout)</span>
                                        <span className="text-sm text-gray-400">Holds 100,000 $ROLL</span>
                                    </div>
                                    <div className="font-bold text-white">5% Discount</div>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center">
                                    <div>
                                        <span className="text-beetle-gold font-bold block">Tier 2 (Guardian)</span>
                                        <span className="text-sm text-gray-400">Holds 1,000,000 $ROLL</span>
                                    </div>
                                    <div className="font-bold text-white">15% Discount on Gear</div>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center">
                                    <div>
                                        <span className="text-beetle-gold font-bold block">Tier 3 (Elder)</span>
                                        <span className="text-sm text-gray-400">Holds 5,000,000 $ROLL</span>
                                    </div>
                                    <div className="font-bold text-white">25% Discount + Voting Rights</div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Security Protocol */}
                        <section>
                            <h3 className="text-xl font-bold text-beetle-gold mb-4">4. "No-Rug" Security Protocol</h3>
                            <ul className="grid md:grid-cols-2 gap-4">
                                <li className="bg-black/40 p-4 rounded-xl border border-white/10">
                                    <div className="font-bold text-white mb-1">2-Day Transparency Buffer</div>
                                    <p className="text-sm text-gray-400">48-hour timelock on all administrative security actions.</p>
                                </li>
                                <li className="bg-black/40 p-4 rounded-xl border border-white/10">
                                    <div className="font-bold text-white mb-1">Reentrancy Guard</div>
                                    <p className="text-sm text-gray-400">Protected against common DeFi drainage exploits.</p>
                                </li>
                                <li className="bg-black/40 p-4 rounded-xl border border-white/10">
                                    <div className="font-bold text-white mb-1">Ownership Transition</div>
                                    <p className="text-sm text-gray-400">Contract moved to Multi-Sig or Renounced at launch.</p>
                                </li>
                                <li className="bg-black/40 p-4 rounded-xl border border-white/10">
                                    <div className="font-bold text-white mb-1">Liquidity Lock</div>
                                    <p className="text-sm text-gray-400">1-Year hard-coded lock via LiquidityLocker.sol.</p>
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
