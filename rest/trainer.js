(function(µ,SMOD,GMOD,HMOD,SC){

	SC=SC({
		jConn:"DB/jsonConnector",
		File:"File",
		util:"File.util",
		Kanji:require.bind(null,"../lib/kanji")
	});

	var storageParam={fileRotation:3};
	var storageFolder=new SC.File(__dirname).changePath("../storages");
	var conn=SC.util.enshureDir(storageFolder).then(()=>
	{
		var storage=storageFolder.clone().changePath("storage.json");
		var db=new SC.jConn(storage,storageParam);
		return storage.exists().then(()=>db,
		function()
		{
			var lastSuccess=new Date();
			var kanjis=require("../lib/kanjiList").map(k=>new SC.Kanji(k,lastSuccess));
			return db.save(kanjis).then(()=>db);
		});
	});

	conn.catch(error=>µ.logger.error({error:error}),"could not create storage connection");

	module.exports.list=function()
	{
		var rand=Math.random();
		return conn.then(db=>db.load(SC.Kanji,null,["score","lastSuccess","grade","strokes","number"]))
		.then(list=>list.slice(0,7).concat(list.slice(rand*(list.length-1),rand*(list.length-1)+3)));
	};
	module.exports.update=function()
	{
	};

})(Morgas,Morgas.setModule,Morgas.getModule,Morgas.hasModule,Morgas.shortcut);