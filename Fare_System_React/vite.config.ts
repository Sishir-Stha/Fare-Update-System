import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
 server: {
  host: '192.168.17.19',
  port: 5173,
  allowedHosts: [
    'itsystem.yetiairlines.com',  
    'localhost',            
    '127.0.0.1'              
  ],
 }
})
