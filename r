eval $(node -e 'A=process.argv[1].split(/\r?\n\r?\n/);console.log("a="+A.length+"\n"+A.map(a=>Object.fromEntries(a.split(/\r?\n/).map(a=>[a.split(":")[0],a.split(":")[1].trim()]))).map(a=>"node server.js "+a.port).join(" & "))' "$(cat meta)")