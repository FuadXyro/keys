const fs = require('fs')

global.creator = 'ArifzynXD' 
global.apikey = ["Arifzyn", "ArifzynXD", "SkyBot"]

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
	delete require.cache[file]
	require(file)
})
