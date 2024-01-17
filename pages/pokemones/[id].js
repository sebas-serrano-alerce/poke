import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Pokemon = ({ data }) => {
	const router = useRouter()
	console.log( {data, router} )
	if (router.isFallback) {
		return <p>Cargando...</p>
	}
	return (
		<div>
			<h1>{data.name} número #{data.id}</h1>
			<Image src={data.sprites.front_default} width={400} height={400} />
			<Link href="/">Volver al inicio</Link>
		</div>
	)
}
// Al ejecutar este codigo se genera un error en el component Image Invalid src prop algo asi como
// hostname "raw.githubusercontent.com" is not configured under images in your `next.config.js`
// ver archivo para solucion

// para emplear SSR (Server Side Rendering) exportamos una funcion con este nombre
// al ser una funcion asincrona retorna una promesa
// NOTA. esta funcion se ejecuta en el lado del servidor. El console.log se muestra en la consola del servidor
/* Vamos a hacer que se genere contenido estatico para estas paginas modificando esta funcion por getStaticProps
export const getServerSideProps = async ({ params }) => {
	//console.log(props)
	
	const response = await fetch(`http://pokeapi.co/api/v2/pokemon/${params.id}`)
	const data = await response.json()
	
	return { props: { data }}
	// Lo que devuelve esta funcion se pasa al componente
}
*/

// NOTA: este renderizado en el lado del servidor solo ocurre si ingresamos la URL directamente
// si accedemos a traves de un link next devuelve un js que se ejecuta en el lado del cliente

// Sin la funcion getStaticPath se produce un error getStaticPaths is required for dynamic SSG pages
export const getStaticProps = async ({ params }) => {
	//console.log(props)
	
	const response = await fetch(`http://pokeapi.co/api/v2/pokemon/${params.id}`)
	const data = await response.json()
	
	return { props: { data }}
	// Lo que devuelve esta funcion se pasa al componente
}

// Esta funcion va a decir que paginas se van a generar estaticas
export const getStaticPaths = async () => {
	const paths = [
		{ params: {id: '1'} },
		{ params: {id: '2'} },
	]
	
	return {
		paths,
		fallback: true, // con false da error 404 cuando no esta generada estatica
		                // con true intenta renderizar la pagina lazy (se debe usar router y isFallback
						// una vez accedamos a una pagina ya queda renderizada como html y las siguientes
                        // llamadas ya no se 
                        // con 'blocking' se salta el proceso de fallback y se bloquea el proceso hasta
                        // que getStaticProps devuelve los datos						
	}
}

export default Pokemon