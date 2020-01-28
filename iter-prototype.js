#!/usr/bin/env node

export function IterPrototype( value){
	if( !( this instanceof IterPrototype)){
		return new IterPrototype( value)
	}
	if( typeof value!== "function"){
		value= value.constructor
	}
	Object.defineProperty( this, "value", {
		value: value,
		writable: true
	})
	return this
}
export default IterPrototype

IterPrototype.prototype= Object.create( null, {
	next: {
		value: function next(){
			if( this.done){
				return {
					done: true,
					value: undefined
				}
			}
			const value= this.value
			this.value= Object.getPrototypeOf( this.value)
			return {
				done: false,
				value
			}
		}
	},
	done: {
		get: function(){
			return this.value&& this.value.constructor=== Object
		}
	},
	[ Symbol.iterator]: {
		value: function(){
			return this
		}
	}
})

if( typeof process!== undefined&& `file://${ process.argv[ 1]}`=== import.meta.url){
	import( "./main.js").then( main=> main.default())
}
