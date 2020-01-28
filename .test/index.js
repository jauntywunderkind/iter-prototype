#!/usr/bin/env node
import tape from "tape"
import IterPrototype from "../iter-prototype.js"
import { A, B, C} from "./_fixture_abc.js"

tape( "walks prototypes", function( t){
	const expected= [ C, B, A, Object.getPrototypeOf(Function)]
	for( let klass of IterPrototype( new C())){
		const e= expected.shift()
		t.equal( klass, e, `klass ${e.name}`)
	}
	t.equal( expected.length, 0, "all expected")
	t.end()
})
