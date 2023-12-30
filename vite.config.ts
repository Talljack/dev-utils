import react from '@vitejs/plugin-react'
import { internalIpV4 } from 'internal-ip'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM)

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const host = await internalIpV4()
  const config = {
    plugins: [react(), viteTsconfigPaths(), svgr()],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      port: 5173,
      strictPort: true,
      host: mobile ? '0.0.0.0' : false,
      hmr: mobile
        ? {
            protocol: 'ws',
            host: host,
            port: 5183
          }
        : undefined,
      watch: {
        // 3. tell vite to ignore watching `src-tauri`
        ignored: ['**/src-tauri/**']
      }
    }
  }
  return config
})
