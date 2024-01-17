/** @type {import('next').NextConfig} */

// añadida propiedad images para solucionar el error de Images (hostname is not configured...)
// los cambios en este archivo deben reiniciar el servidor (?)
const nextConfig = {
  reactStrictMode: true,
  images: {
	  domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
