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
				i = d("#appUserCallRecordInfosTable").data("url"),
				layer = layui.layer;
				
			l.on("tool(appUserCallRecordInfosTable)",function(obj){
				  var data = obj.data; //获得当前行数据
				  var layEvent = obj.event; 
				  var tr = obj.tr;  
			});		

			d("#searchBtn").on("click", function() {
					var t = d(this).data("url"),
						i = d("#keywords").val();
					    l.reload("appUserCallRecordInfosTable",{where:{"keyword":i}})
			});			 
				   
			l.render({
				elem: "#appUserCallRecordInfosTable",
				url: i,
				toolbar: false,
				title: "APP用户通话记录查询",
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
						field: "callType",
						title: "呼叫类型",
						align:"center",
						templet:"#callTypeTpl"
					}, {
						field: "calledPhone",
						title: "号码",
						align:"center"
					}, {
						field: "callName",
						title: "备注",
						align:"center"
					}, {
						field: "callTime",
						title: "呼叫时间",
						align:"center"
					}]
				]
			});
		})
	}
	
});