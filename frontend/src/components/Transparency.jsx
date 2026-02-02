import { useState } from 'react';
import { motion } from 'framer-motion';

const WalletRow = ({ label, address, delay }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="flex flex-col md:flex-row justify-between items-center bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors"
        >
            <div className="flex flex-col mb-2 md:mb-0">
                <span className="text-beetle-gold font-bold text-sm uppercase tracking-wider">{label}</span>
                <span className="text-xs text-gray-500">Verified & Trackable</span>
            </div>
            <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-lg border border-white/5 font-mono text-sm text-gray-300 break-all">
                {address.slice(0, 6)}...{address.slice(-4)}
                <button
                    onClick={copyToClipboard}
                    className="ml-2 text-beetle-accent hover:text-white transition-colors text-xs uppercase"
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
                <a
                    href={`https://testnet.bscscan.com/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors"
                >
                    Scan ↗
                </a>
            </div>
        </motion.div>
    );
};

export default function Transparency() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 z-10 relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Total Transparency</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We don't hide. Monitor our marketing spend, shop procurement, and liquidity in real-time.
                        This is the <span className="text-beetle-gold">Dung Beetle Promise</span>.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Wallets */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Official Wallets
                        </h3>
                        <WalletRow label="Marketing Fund (3%)" address="0x0CFeCd2A660C342B4E45196fF868D0EC5e555e69" delay={0.1} />
                        <WalletRow label="Shop Inventory (2%)" address="0x0CFeCd2A660C342B4E45196fF868D0EC5e555e69" delay={0.2} />
                        <WalletRow label="Seed Sale Contract" address="0x4D9c1cCA15fAB71FF56A51768DA2B85716b38c9f" delay={0.3} />
                    </div>

                    {/* Links */}
                    <div className="bg-beetle-green/20 border border-beetle-green/30 p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-beetle-gold/10 rounded-full blur-3xl"></div>

                        <h3 className="text-2xl font-bold text-white mb-6">Community & Docs</h3>

                        <div className="space-y-4">
                            <a href="#" className="block group">
                                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5 group-hover:border-beetle-gold/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">📢</span>
                                        <span className="text-white font-bold group-hover:text-beetle-gold transition-colors">Telegram Channel</span>
                                    </div>
                                    <span className="text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </a>

                            <a href="#" className="block group">
                                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5 group-hover:border-beetle-gold/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">📄</span>
                                        <span className="text-white font-bold group-hover:text-beetle-gold transition-colors">Technical Blueprint</span>
                                    </div>
                                    <span className="text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </a>

                            <a href="#" className="block group">
                                <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5 group-hover:border-beetle-gold/50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🛍️</span>
                                        <span className="text-white font-bold group-hover:text-beetle-gold transition-colors">Future Shop Preview</span>
                                    </div>
                                    <span className="text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
