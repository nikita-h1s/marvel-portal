import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/marvel-api': {
                target: 'https://marvel-server-zeta.vercel.app',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/marvel-api/, '')
            }
        }
    }
})
