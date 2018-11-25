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
				i = d("#userEmergencyContactInfoTable").data("url"),
				layer = layui.layer;
				   
			l.render({
				elem: "#userEmergencyContactInfoTable",
				url: i,
				toolbar: false,
				title: "用紧急联系人信息",
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
						field: "name",
						title: "联系人",
						align:"center"
					}, {
						field: "mobile",
						title: "联系电话",
						align:"center"
					}]
				]
			});
		})
	}
	
});