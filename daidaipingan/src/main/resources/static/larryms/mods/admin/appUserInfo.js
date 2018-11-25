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
				i = d("#appUserInfoTable").data("url"),
				layer = layui.layer;
				
			l.on("tool(appUserInfoTable)",function(obj){
				  var data = obj.data; //获得当前行数据
				  var layEvent = obj.event; 
				  var tr = obj.tr;  
 				if(layEvent=="resetPassword"){
 					var result = null;
                    c.confirm('确认重置登录密码？', {
                        icon: 3,
                        skin:"larry-green",
                        anim:false,
                        title: '重置密码'
                    }, function() { 				
						d.ajax({ 
					        type: "post", 
					        url: "/api/resetPassword", 
					        async:false, 
					        data:{"id":data.id},
					        dataType: "json",
					        success: function(jsonData){ 
					        	 result = jsonData;
					        } 
						});		
					     resetResultProcess(result);
					});		  
				  }
			});		

			function resetResultProcess(resultData){
			   if (resultData.code=="0") {
			   	layer.alert("新密码为："+resultData.password);	
				} else {
					layer.alert(resultData.reason);	
				}			
			}
			d("#searchBtn").on("click", function() {
					var t = d(this).data("url"),
						i = d("#keywords").val();
					    l.reload("appUserInfoTable",{where:{"keyword":i}})
			});			 
				   
			l.render({
				elem: "#appUserInfoTable",
				url: i,
				toolbar: false,
				title: "APP用户数据表",
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
						title: "用户账号",
						width: 400,
						align:"center"
					}, {
						field: "loanNum",
						title: "申请贷款次数",
						width: 400,
						align:"center",
						templet:'<div>{{d.loanNum}}&nbsp;笔</div>'
					}, {
						field: "registedTime",
						title: "注册时间",
						width: 400,
						align:"center"
					},{
						fixed: "right",
						title: "操作",
						align:"center",
						templet:'<div><a class="layui-btn layui-btn-xs" lay-event="resetPassword">重置登录密码</a></div>'
					}]
				]
			});
		})
	}
	
});