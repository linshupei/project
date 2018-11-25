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
        	$("#loanLimit").val(jsonData.loanLimit);  
           	$("#makeLoansLimit").val(jsonData.makeLoansLimit);  
        	$("#payDate").val(jsonData.payDate);  
        	$("#bankCard").val(jsonData.bankCard);
        	if(jsonData.status=="0"){
        		$("#status").html("申请中");
        	}else if(jsonData.status=="1"){
        		$("#status").html("审核不通过");
        	}else if(jsonData.status=="2"){
        		$("#status").html("已放款");
        	}else if(jsonData.status=="3"){
        		$("#status").html("逾期未还");
        	}else if(jsonData.status=="4"){
        		$("#status").html("已还款");
        	}
        	//e.render();
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