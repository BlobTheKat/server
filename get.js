let fs = require('fs'), fetch = require('node-fetch')
const REGIONSIZE = 500e3
;(async (rx, ry, IP) => {
	if(!rx || !ry)process.exit(0)
	let dat = await fetch('https://raw.githubusercontent.com/BlobTheKat/data/master/'+rx+'_'+ry+'.region').then(a=>a.buffer())
	let i = 0
	let metastr = ""
	while(i < dat.length){
		let sx = dat.readInt16LE(i) * 1000 + rx * REGIONSIZE;i+=2
		let sy = dat.readInt16LE(i) * 1000 + ry * REGIONSIZE;i+=2
		let w = dat.readUint16LE(i) * 1000;i+=2
		let h = dat.readUint16LE(i) * 1000;i+=2
		let len = dat.readUint32LE(i + 4)
		let sname = dat.readUint16LE(i)
		let ip = dat.readUint16LE(i + 2)
		i += 8
		sname = ""+dat.slice(i, i += sname)
		ip = ""+dat.slice(i, i += ip)
		let [ipa, p] = ip.split(':')
		let arr = []
		while(len--){
			let id = dat.readUint16LE(i);i+=2
			let a = id & 2 ? 1 : 0
			let b = id & 4 ? 1 : 0
			let c = id & 8 ? 1 : 0
			let o
			if(id & 1){
				let x = dat.readInt32LE(i);i += 4
				let y = dat.readInt32LE(i);i += 4
				let dx = 0
				let dy = 0
				if(a)i += 2
				if(b)dx = dat.readFloatLE(i),i += 4
				if(c)dy = dat.readFloatLE(i),i += 4
				id >>= 4
				o = {id, x, y, dx, dy}
			}else{
				let id2 = dat[i++]
				let x = dat.readInt32LE(i);i += 4
				let y = dat.readInt32LE(i);i += 4
				let mass = dat.readInt32LE(i);i += 4
				let spin = 0
				if(a)i += 2
				if(b)spin = dat.readFloatLE(i),i += 4
				i += dat[i] + 1
				let richness = 0.1
				let resource = ""
				if(id & 16)richness = dat[i++] / 100
				if(id & 32)resource = dat.slice(i + 1, i += dat[i] + 1).toString()
				id >>= 8
				id += id2 << 8
				o = {radius: id, x, y, mass, spin, superhot:c, richness, resource}
			}
			arr.push(o)
		}
		if(IP && ipa != IP)continue
		let name = 'sectors/sector_'+Math.round(sx/1000)+'_'+Math.round(sy/1000)
		fs.writeFileSync(name, arr.map(a=>Object.entries(a).map(a=>a.join(': ')).join('\n')).join('\n\n'))
		metastr += '\n\nx: '+sx+'\ny: '+sy+'\nw: '+w+'\nh: '+h+'\nport: '+p+'\npath: '+name+'\nname: '+sname
	}
	fs.writeFileSync('meta', metastr.slice(2))
})(...process.argv.slice(2))