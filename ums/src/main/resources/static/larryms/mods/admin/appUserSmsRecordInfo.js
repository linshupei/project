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
				i = d("#appUserSmsRecordInfosTable").data("url"),
				layer = layui.layer;
				
			l.on("tool(appUserSmsRecordInfosTable)",function(obj){
				  var data = obj.data; //获得当前行数据
				  var layEvent = obj.event; 
				  var tr = obj.tr;  
			});		

			d("#searchBtn").on("click", function() {
					var t = d(this).data("url"),
						i = d("#keywords").val();
					    l.reload("appUserSmsRecordInfosTable",{where:{"keyword":i}})
			});			 
				   
			l.render({
				elem: "#appUserSmsRecordInfosTable",
				url: i,
				toolbar: false,
				title: "APP用户短信记录查询",
				page:true,
				cols: [
					[{
						field: "id",
						title: "",
						width: 120,
						align:"center",
						hide:true
					},  {
						field: "userAccount",
						title: "APP用户账号",
						align:"center"
					}, {
						field: "type",
						title: "类型",
						align:"center",
						templet:"#smsTypeTpl"
					}, {
						field: "sendPhone",
						title: "号码",
						align:"center"
					}, {
						field: "smsContent",
						title: "发送内容",
						align:"center"
					}, {
						field: "sendTime",
						title: "发送时间",
						align:"center"
					}]
				]
			});
		})
	}
	
});