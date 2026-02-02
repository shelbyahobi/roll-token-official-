import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig, chains } from './wagmi';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} theme={darkTheme({
                accentColor: '#d4af37',
                accentColorForeground: 'black',
                borderRadius: 'medium',
            })}>
                <App />
            </RainbowKitProvider>
        </WagmiConfig>
    </React.StrictMode>,
)
