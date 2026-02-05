import { motion } from 'framer-motion';

const phases = [
    {
        title: "Phase 1: The Nest",
        subtitle: "Foundation & Security",
        status: "current",
        items: ["Contract Audit (Passed)", "Seed Round (Live)", "Community Building", "DApp v1 Launch"]
    },
    {
        title: "Phase 2: The Roll",
        subtitle: "Launch & Growth",
        status: "upcoming",
        items: ["PancakeSwap Listing", "Liquidity Locked (1 Year)", "CoinGecko Listing", "Marketing Campaign"]
    },
    {
        title: "Phase 3: The Flight",
        subtitle: "Utility & Ecosystem",
        status: "upcoming",
        items: ["Colony Vault Opens", "Merch Shop Live", "Partner Discounts", "Governance Multi-Sig"]
    },
    {
        title: "Phase 4: The Swarm",
        subtitle: "Expansion",
        status: "upcoming",
        items: ["Cross-Chain Bridge", "DAO Voting", "10,000+ Holders", "CEX Listings"]
    }
];

export default function Roadmap() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Line */}
            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-beetle-gold/30 to-transparent hidden md:block"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-white mb-4">The <span className="text-beetle-gold">Master Plan</span></h2>
                    <p className="text-gray-400">From the dirt to the stars. This is how we roll.</p>
                </div>

                <div className="space-y-12 md:space-y-0 relative">
                    {phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`flex flex-col md:flex-row items-center justify-between gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Content Side */}
                            <div className="w-full md:w-5/12">
                                <div className={`p-8 rounded-2xl border ${phase.status === 'current' ? 'bg-beetle-gold/10 border-beetle-gold' : 'bg-[#111] border-white/10'} hover:border-beetle-gold/50 transition-all`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className={`text-2xl font-bold ${phase.status === 'current' ? 'text-beetle-gold' : 'text-white'}`}>{phase.title}</h3>
                                        {phase.status === 'current' && (
                                            <span className="px-3 py-1 bg-beetle-gold text-black text-xs font-black rounded-full animate-pulse">
                                                ACTIVE
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 font-mono mb-6 uppercase tracking-widest">{phase.subtitle}</p>
                                    <ul className="space-y-3">
                                        {phase.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-300">
                                                <span className={`w-2 h-2 rounded-full ${phase.status === 'current' ? 'bg-beetle-gold' : 'bg-gray-600'}`}></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Center Marker */}
                            <div className="md:w-2/12 flex justify-center relative">
                                <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center relative z-10 ${phase.status === 'current' ? 'border-beetle-gold bg-black' : 'border-gray-700 bg-[#111]'}`}>
                                    <div className={`w-3 h-3 rounded-full ${phase.status === 'current' ? 'bg-beetle-gold' : 'bg-gray-700'}`}></div>
                                </div>
                            </div>

                            {/* Spacer Side */}
                            <div className="w-full md:w-5/12"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
