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
				i = d("#AppUserContactInfosTable").data("url"),
				layer = layui.layer;
				
			l.on("tool(AppUserContactInfosTable)",function(obj){
				  var data = obj.data; //获得当前行数据
				  var layEvent = obj.event; 
				  var tr = obj.tr;  
			});		

			d("#searchBtn").on("click", function() {
					var t = d(this).data("url"),
						i = d("#keywords").val();
					    l.reload("AppUserContactInfosTable",{where:{"keyword":i}})
			});			 
				   
			l.render({
				elem: "#AppUserContactInfosTable",
				url: i,
				toolbar: false,
				title: "APP用户通讯录",
				page:true,
				cols: [
					[{
						field: "id",
						title: "",
						width: 120,
						align:"center",
						hide:true
					}, {
						field: "userAccount",
						title: "APP用户账号",

						align:"center"
					}, {
						field: "name",
						title: "联系人",

						align:"center"
					}, {
						field: "mobile",
						title: "联系方式",
						align:"center"
					}]
				]
			});
		})
	}
	
});