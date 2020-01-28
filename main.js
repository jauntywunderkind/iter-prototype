#!/usr/bin/env node
import IterPrototype from "./iter-prototype.js"

export async function main( opt= {}){
	let
		file= opt.file,
		exp= opt.export,
		log= opt.log|| console.log
	if( !file|| !exp){
		let argv= opt.argv
		if( !argv){
			const process_= opt.process|| process
			argv= process.argv
		}
		if( !file){
			file= argv[ 2]
			if( !file){
				throw new Error("file required")
			}
		}
		if( !exp){
			exp= argv[ 3]|| "default"
		}
	}
	import( file).then( function( module){
		const target= module[ exp]
		if( !target){
			throw new Error( `no target for file:${file} export:${exp}`)
		}
		for( let klass of IterPrototype( target)){
			log( klass.name)
		}
	})
}
export default main
