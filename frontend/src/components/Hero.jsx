import { motion } from 'framer-motion';

export default function Hero({ onOpenBlueprint }) {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-beetle-dark via-beetle-green to-black opacity-90 z-0"></div>

            {/* Content */}
            <div className="z-10 container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-center md:text-left"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-beetle-gold to-yellow-200 mb-4 drop-shadow-lg">
                        $ROLL
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                        Even Sh*t Can Shine.
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg">
                        The first <b>Organic Value Flywheel</b> token.
                        <span className="block mt-2 text-beetle-accent">0% Buy Tax. 100% Locked Liquidity.</span>
                    </p>

                    <div className="flex gap-4 justify-center md:justify-start">
                        <button className="bg-beetle-gold text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                            Join Seed Round
                        </button>
                        <button
                            onClick={onOpenBlueprint}
                            className="bg-black/50 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:scale-105"
                        >
                            Read Blueprint
                        </button>
                    </div>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="flex-1"
                >
                    <img
                        src="/hero.png"
                        alt="Dung Beetle Rolling Gold"
                        className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl border border-beetle-gold/20 hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-shadow duration-500"
                    />
                </motion.div>
            </div>
        </section>
    )
}
