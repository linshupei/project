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
				i = d("#userWorkUnitInfoTable").data("url"),
				layer = layui.layer;
				   
			l.render({
				elem: "#userWorkUnitInfoTable",
				url: i,
				toolbar: false,
				title: "用户工作单位",
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
						field: "workUnitName",
						title: "公司名称",
						align:"center"
					}, {
						field: "workUnitPhone",
						title: "公司联系电话",
						align:"center"
					}, {
						field: "workUnitAddress",
						title: "公司地址",
						align:"center"
					}]
				]
			});
		})
	}
	
});