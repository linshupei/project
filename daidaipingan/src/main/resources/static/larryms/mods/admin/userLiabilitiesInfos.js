layui.define(["jquery", "code", "element", "slider", "rate","larryms","laytpl","table","form"], function(e) {

	var r = layui.element,
		t = layui.slider,
		i = layui.rate,
		 c = layui.larryms;		
		 
  if (layui.cache.identified == "tables") {
		layui.use(["table", "laytpl", "form","larryms","layer"], function() {
			var l = layui.table,
				d = layui.$
				e = layui.laytpl,
				t = layui.form,
				i = d("#auserLiabilitiesInfoTable").data("url"),
				layer = layui.layer;
				   
			l.render({
				elem: "#auserLiabilitiesInfoTable",
				url: i,
				toolbar: false,
				title: "用户负债信息",
				page:true,
				where:getReloadOptions().where,
				cols: [
					[{
						field: "id",
						title: "",
						width: 120,
						align:"center",
						hide:true
					}, {
						field: "liabilitiesPlatform",
						title: "负债平台",
						align:"center"
					}, {
						field: "liabilitiesAmount",
						title: "负债金额",
						align:"center"
					}]
				]
			});
		})
	}
	
});