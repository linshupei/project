layui.use(["form", "layedit", "laydate","table","larryms"], function() {
	
	var e = layui.form,
		t = layui.layer,
		i = layui.layedit,
		$ = layui.$,
		c = layui.larryms,		
		idCardImage="",
		idCardHand="",
		bankCard="",
		keyword="";
	var requestParam = getRequestParam();
	$("#loanId").val(requestParam["id"]);

			
	$.ajax({ 
        type: "get", 
        url: "/api/query/userLoanInfoPart", 
        async:false, 
        data:{"id":requestParam["id"]},
        dataType: "json",
        success: function(jsonData){ 
        	$("#userAccount").html(jsonData.userAccount);  
            $("#mobileRealNameTime").html(jsonData.mobileRealNameTime);
            $("#mobileServicePassword").html(jsonData.mobileServicePassword);
            $("#alipayAccount").html(jsonData.alipayAccount);
            $("#mobile").html(jsonData.mobile);
            $("#zhiMaFen").html(jsonData.zhiMaFen);
            $("#huaBei").html(jsonData.huaBei);
            $("#workUnitPhone").html(jsonData.workUnitPhone);
            $("#miFang").html(jsonData.miFang);
            idCardImage="idCardPositive="+jsonData.idCardImage.idCardPositive+"&"+"idCardOtherSize="+jsonData.idCardImage.idCardOtherSize;
            idCardHand="idCardHand="+jsonData.idCardImage.idCardHand;
            bankCard="bankCard="+jsonData.bankCardImage;
            keyword =jsonData.userAccount;
            $("#workUnitAddress").html(jsonData.workUnitAddress);
            $("#jieDaiBao").html(jsonData.jieDaiBao);
            $("#jieDaiBao").html(jsonData.jieDaiBao);
            $("#applyTime").html(jsonData.applyTime);
            $("#voucher").html(jsonData.voucher);
            //$("#idCardImage").attr("href",jsonData.idCardImage);
            $("#userEmergencyContact1").html(jsonData.userEmergencyContact.userEmergencyContact1);
            $("#userEmergencyContact2").html(jsonData.userEmergencyContact.userEmergencyContact2);
            $("#userEmergencyContact3").html(jsonData.userEmergencyContact.userEmergencyContact3);
            $("#userEmergencyContact4").html(jsonData.userEmergencyContact.userEmergencyContact4);
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
	//
    $('#userCallInfoPre').on('click', function() {
    	var i = $(this).data("url") + "?keyword="+keyword+"&random="+Math.random().toString(36).substr(2);
    	preIframe.src = i;
    });	
    
    $('#userCallInfo').on('click', function() {
    	var i = $(this).data("url") + "?keyword="+keyword;
		c.open({
			type: 2,
			skin: "larryms-navy",
			title: "用户通话记录",
			area: ["100%", "100%"],
			shadeClose: true,
			shade: .2,
			offset: "20px",
			maxmin: true,
			btnAlign: "c",
			content: i,
			success: function(e, t) {}
		})    	
    });
    
    
    $('#userSmsInfoPre').on('click', function() {
    	var i = $(this).data("url") + "?keyword="+keyword+"&random="+Math.random().toString(36).substr(2);
    	preIframe.src = i;
    });	
    $('#userSmsInfo').on('click', function() {
    	var i = $(this).data("url") + "?keyword="+keyword+"&random="+Math.random().toString(36).substr(2);
		c.open({
			type: 2,
			skin: "larryms-navy",
			title: "用户短信",
			area: ["100%", "100%"],
			shadeClose: true,
			shade: .2,
			offset: "20px",
			maxmin: true,
			btnAlign: "c",
			content: i,
			success: function(e, t) {}
		})    	
    });
    
    $('#userContactInfoPre').on('click', function() {
    	var i = $(this).data("url") + "?keyword="+keyword+"&random="+Math.random().toString(36).substr(2);
    	preIframe.src = i;
    });	
    $('#userContactInfo').on('click', function() {
    	var i = $(this).data("url") + "?keyword="+keyword;
		c.open({
			type: 2,
			skin: "larryms-navy",
			title: "用户通讯录",
			area: ["100%", "100%"],
			shadeClose: true,
			shade: .2,
			offset: "20px",
			maxmin: true,
			btnAlign: "c",
			content: i,
			success: function(e, t) {}
		})    	
    });
    
	$('#bankCard').on('click',function(){
		  var idCardUrl = $(this).data("url") + "?"+bankCard;
			c.open({
				type: 2,
				skin: "larryms-navy",
				title: "图片预览",
				area: ["100%", "100%"],
				shadeClose: true,
				shade: .2,
				offset: "20px",
				maxmin: true,
				btnAlign: "c",
				content: idCardUrl,
				success: function(e, t) {}
			})  	
	});		
	$('#idCardHand').on('click',function(){
		  var idCardUrl = $(this).data("url") + "?"+idCardHand;
			c.open({
				type: 2,
				skin: "larryms-navy",
				title: "图片预览",
				area: ["100%", "100%"],
				shadeClose: true,
				shade: .2,
				offset: "20px",
				maxmin: true,
				btnAlign: "c",
				content: idCardUrl,
				success: function(e, t) {}
			})  	
	});	
	$('#idCardImage').on('click',function(){
		  var idCardUrl = $(this).data("url") + "?"+idCardImage;
			c.open({
				type: 2,
				skin: "larryms-navy",
				title: "图片预览",
				area: ["100%", "100%"],
				shadeClose: true,
				shade: .2,
				offset: "20px",
				maxmin: true,
				btnAlign: "c",
				content: idCardUrl,
				success: function(e, t) {}
			})  	
	});
    $('#agreeLoan').on('click', function() {
    	//var curIfr = parent.layer.getFrameIndex(window.name);
        //parent.layer.close(curIfr);
    	var i = $(this).data("url") + "?id=" + $("#loanId").val();
		c.open({
			type: 2,
			skin: "larryms-navy",
			title: "同意放款",
			area: ["500px", "400px"],
			shadeClose: true,
			shade: .2,
			offset: "20px",
			maxmin: true,
			btnAlign: "c",
			content: i,
			success: function(e, t) {}
		})    	
    });
    
    $('#loanDenied').on('click', function() {
    	//var curIfr = parent.layer.getFrameIndex(window.name);
        //parent.layer.close(curIfr);

		var result = null;
        c.confirm('确认拒绝该贷款申请吗', {
            icon: 3,
            anim:false,
            title: '申请拒绝'
        }, function() {
        	var loanDeniedObj = new Object();
        	loanDeniedObj.id=$("#loanId").val();
        	d.ajax({ 
                type: "post", 
                url: "/api/loanDenied", 
                contentType:"application/json;charset=utf-8",
                async:false, 
                data:JSON.stringify(loanDeniedObj),
                dataType: "json",
                success: function(jsonData){ 
                	result = jsonData;
                } 
        	});    
            if(result){
            	if(result.code=="0"){
            		c.alert("操作成功！");
            	}else{
            		c.alert(result.reason);                  
            	}                    	
            }                    	
        });
	   	
    });    
});