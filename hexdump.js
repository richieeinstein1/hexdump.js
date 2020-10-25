const fs = require('fs')
let file = process.argv.slice(2)[0] //Take the 3rd item and it's first index of the array
function hexdump(file) {
	let buffer = fs.readFileSync(file) //Read the file
	let lines = [] 
	for (let i = 0; i < buffer.length; i += 16) { //loop over buffer for every 16 parts
		let address = i.toString(16).padStart(8, "0") //append  8 zeros  infront of the address 
		let block  = buffer.slice(i, i+16) //cut buffer into blocks of 16 
		let hexArray = [] 
		let asciiArray = []
		let padding = ' '
		for (let value of block) {
			hexArray.push(value.toString(16).padStart(2,"0"))  
			asciiArray.push(value >= 0x20 && value < 0x7f ? String.fromCharCode(value) : '.') 
			 // if the values are in the  ascii range get them otherwise represent them with a dot
		}
		//if blovk is less than 16 bytes. calculate remaining space 
		if (hexArray.length < 16) {
			let space = 16 - hexArray.length
			padding = ' '.repeat(space * 2 + space + (hexArray.length < 9 ? 1 : 0)) //Calculate extra space if it 8 or less
		}
		let  hexString = hexArray.length > 9 ? hexArray.slice(0, 8).join(' ') + ' ' + hexArray.slice(8).join(' ') : 
		hexArray.join(' ')
		let  asciiString =  asciiArray.join('')

		let line = `${address} ${padding} ${hexString} ${padding} ${asciiString}`
		lines.push(line)
	}
	// console.log (`Address    Hexdecimal reps  	 			Ascii reps`)
	return lines.join('\n')
}
console.log(hexdump(file))