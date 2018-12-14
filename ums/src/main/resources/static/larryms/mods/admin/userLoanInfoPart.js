

layui.define(["jquery", "code", "element", "slider", "rate","larryms","laytpl","table","form"], function(e) {

	var r = layui.element,
		t = layui.slider,
		i = layui.rate,
		c = layui.larryms;		
	
  if (layui.cache.identified == "userLoanInfos") {
		layui.use(["table", "laytpl", "form","larryms","layer"], function() {
			var l = layui.table,
				d = layui.$
				e = layui.laytpl,
				t = layui.form,
				i = d("#userLoanInfoPart").data("url"),
				table = layui.table,
				layer = layui.layer;
				
			l.on("tool(userLoanInfoPart)",function(obj){
				  var data = obj.data; //获得当前行数据
				  var layEvent = obj.event; 
				  var tr = obj.tr;  
				  
			  if (layEvent == "viewUserLoanInfoPart") {
					var i = d(this).data("url") + "?id=" + data.id;
					var l = c.open({
						type: 2,
						skin: "larryms-navy",
						title: "详情",
						area: ["100%","100%"],
						shadeClose: true,
						shade: .2,
						offset: "20px",
						maxmin: true,
						btnAlign: "c",
						content: i,
						success: function(e, t) {}
					})
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
				var reuqestParam = getReloadOptions();
				if(!reuqestParam.keyword){
					reuqestParam.keyword = i;
				}
				    l.reload("userLoanInfoPart",reuqestParam);
			});		
			
			l.render({
				elem: "#userLoanInfoPart",
				url: i,
				toolbar: false,
				title: "用户贷款信息表",
				page:true,
				where:getReloadOptions().where,
				cols: [
					[{
						field: "id",
						title: "",
						align:"center",
						hide:true
					}, {
						field: "mobile",
						title: "账号",
						align:"center"
					},{
						field: "userName",
						title: "姓名",
						align:"center"
					}, {
						field: "mobile",
						title: "手机",
						align:"center"
					},{
						field: "applyDate",
						title: "申请贷款时间",
						align:"center"
					},{
						fixed: "right",
						title: "操作",
						templet: "#userLoanInfoTpl",
						align:"center"
					}]
				]
			});
		})
	}
	e("layuidemo", {})
});