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

			l.on("toolbar(AppUserContactInfosTable)",function(obj){
				  var layEvent = obj.event; 
				  if(layEvent=="exportExcel"){
				  
					var str = location.search; 
					var num = str.indexOf("?")
					str = str.substr(num + 1); 				  
					 //导出excel
					  window.location.href="/api/exportAppUserContactInfos?"+str;
				 }				
			});
			
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
			
			function queryData(){
				var queryDatas;
				var str = location.search; 
				var num = str.indexOf("?")
				str = str.substr(num + 1); 				
				d.ajax({ 
			        type: "get", 
			        url: "/api/appUserContactInfoList?"+str, 
			        async:false, 
			        dataType: "json",
			        success: function(jsonData){ 
			        	queryDatas=jsonData;
			        } 
				});			
				return queryDatas;
			}
			l.render({
				elem: "#AppUserContactInfosTable",
				//url: i,
				data:queryData(),
				toolbar: '<div id="exportExcel" class="layui-table-tool-self"><div class="layui-inline" title="导出到excel" lay-event="exportExcel"><i class="layui-icon layui-icon-export"></i></div></div>',
				defaultToolbar:['filter'],
				title: "APP用户通讯录",
				page:false,
				where:getReloadOptions().where,
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