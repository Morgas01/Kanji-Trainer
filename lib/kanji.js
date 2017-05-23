(function(µ,SMOD,GMOD,HMOD,SC){

	var DBObj=GMOD("DBObj"),
		FIELD=GMOD("DBField");

	//SC=SC({});

	var MAX_SCORE=10;
	var MIN_SCORE=-MAX_SCORE;

	var KANJI=µ.Class(DBObj,{
		objectType:"Kanji",
		init:function(param,lastSuccess)
		{
			if(!param)param={};
			this.mega(param);

			this.addField("number",		FIELD.TYPES.INT		,param["#"]*1);
			this.addField("character",	FIELD.TYPES.STRING	,param.New);
			this.addField("redical",	FIELD.TYPES.STRING	,param.Radical);
			this.addField("strokes",	FIELD.TYPES.INT		,param.Strokes*1);
			this.addField("grade",		FIELD.TYPES.STRING	,param.Grade);
			if(typeof param.Readings==="string")
			{
				var [kana,romanji]=param.Readings.split("\n");
				romanji=romanji.split(/,\s*/);
				param.Readings=kana.split("、").map((k,i)=>({kana:k,romanji:romanji[i]}));
			}
			this.addField("readings",	FIELD.TYPES.JSON	,param.Readings);
			this.addField("english",	FIELD.TYPES.STRING	,param["English meaning"]);

			this.addField("score",		FIELD.TYPES.INT		,0);
			this.addField("lastSuccess",FIELD.TYPES.DATE	,lastSuccess);
		},
		addScore:function(score)
		{
			this.score=Math.min(MAX_SCORE,Math.max(MIN_SCORE,this.score+score));
		}
	});

	module.exports=KANJI;

})(Morgas,Morgas.setModule,Morgas.getModule,Morgas.hasModule,Morgas.shortcut);