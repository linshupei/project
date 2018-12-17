layui.use(["form", "layedit", "laydate"], function() {
	
	var e = layui.form,
		t = layui.layer,
		i = layui.layedit,
		l = layui.laydate,
		$ = layui.$;
	
	l.render({
		elem: "#payDate"
	});
	
	var requestParam = getRequestParam();
	$("#loanId").val(requestParam["id"]);
	
	$.ajax({ 
        type: "get", 
        url: "/api/query/userLoanInfo", 
        async:false, 
        data:{"id":requestParam["id"]},
        dataType: "json",
        success: function(jsonData){ 
			$("loanId").val(jsonData.id);
        	
        } 
	});
	
	function getRequestParam(){
		var name,value,requestParam = new Object();
		var str = location.search; 
		var num = str.indexOf("?")
		str = str.substr(num + 1); 
		str = str.split("&");
		for(var inx=0;inx<str.length;inx++){
			var requestData= str[inx].split("=");
			requestParam[requestData[0]]=requestData[1];
		}
		return requestParam;
	}	
	

});