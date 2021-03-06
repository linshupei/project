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
				i = d("#test").data("url"),
				layer = layui.layer;
			l.on("toolbar(test)",function(obj){
				  var layEvent = obj.event; 
				  if(layEvent=="exportExcel"){
				  
				  var params = "?1=1";
				  if(d("#loanStatus").val()!=""){
				  	params = params+"&loanStatus="+d("#loanStatus").val();
				  }
				  if(d("#keywords").val()!=""){
				  	params = params+"&keyword="+d("#keywords").val();
				  }				  
					 //导出excel
					  window.location.href="/api/exportLoanInfo"+params;
				 }				
			});	
			l.on("tool(test)",function(obj){
				  var data = obj.data; //获得当前行数据
				  var layEvent = obj.event; 
				  var tr = obj.tr;  
						  
				 if(layEvent=="openUserLoanInfo"){
				  	var openUserLoanInfoUrl = d(this).data("url") + "?userInfoId=" + data.id;
				      var a = c.open({
							title: "用户贷款信息",
							type: 2,
							area: ["100%", "100%"],
							content: openUserLoanInfoUrl
					  });						  
				  }else if(layEvent=="openUserEmergencyContact"){
				  	var openUserEmergencyContactUrl = d(this).data("url") + "?userInfoId=" + data.id;
				      var a = c.open({
							title: "用户紧急联系人",
							type: 2,
							area: ["100%", "100%"],
							content: openUserEmergencyContactUrl
					  });						  
				  }else if(layEvent=="openUserWorkUnitInfo"){
				  	var openUserWorkUnitInfoUrl = d(this).data("url") + "?userInfoId=" + data.id;
				      var a = c.open({
							title: "用户工作单位",
							type: 2,
							area: ["100%", "100%"],
							content: openUserWorkUnitInfoUrl
					  });						  
				  }else if(layEvent=="openUserLiabilitiesInfo"){
				  	var openUserLiabilitiesInfoUrl = d(this).data("url") + "?userInfoId=" + data.id;
				      var a = c.open({
							title: "用户负债信息",
							type: 2,
							area: ["100%", "100%"],
							content: openUserLiabilitiesInfoUrl
					  });						  
				  }else if(layEvent=="idCardPositive"){
					  var idCardPositiveUrl = d(this).data("url") + "?imageUrl=" + data.idCardPositive;
				      var a = c.open({
							title: "身份证信息",
							type: 2,
							area: ["100%", "100%"],
							content: idCardPositiveUrl
					  });						  
				  }else if(layEvent=="idCardOtherSize"){
					  var idCardOtherSizeUrl = d(this).data("url") + "?imageUrl=" + data.idCardOtherSize;
				      var a = c.open({
							title: "身份证信息",
							type: 2,
							area: ["100%", "100%"],
							content: idCardOtherSizeUrl
					  });						  
				  }else if(layEvent=="idCardHand"){
					  var idCardHandUrl = d(this).data("url") + "?imageUrl=" + data.idCardHand;
				      var a = c.open({
							title: "身份证信息",
							type: 2,
							area: ["100%", "100%"],
							content: idCardHandUrl
					  });						  
				  }else if(layEvent=="zhiMaFenImage"){
					  var zhiMaFenImageUrl = d(this).data("url") + "?imageUrl=" + data.zhiMaFenImage;
				      var a = c.open({
							title: "芝麻分",
							type: 2,
							area: ["100%", "100%"],
							content: zhiMaFenImageUrl
					  });						  
				  }else if(layEvent=="huaBeiImage"){
					  var huaBeiImageUrl = d(this).data("url") + "?imageUrl=" + data.huaBeiImage;
				      var a = c.open({
							title: "花呗额度",
							type: 2,
							area: ["100%", "100%"],
							content: huaBeiImageUrl
					  });						  
				  }else if(layEvent=="bankCardImage"){
					  var bankCardImageUrl = d(this).data("url") + "?imageUrl=" + data.bankCardImage;
				      var a = c.open({
							title: "收款银行卡",
							type: 2,
							area: ["100%", "100%"],
							content: bankCardImageUrl
					  });					  
				  }else if(layEvent=="resetPassword"){
						d.ajax({ 
					        type: "post", 
					        url: "/api/resetPassword", 
					        async:false, 
					        data:{"id":data.id},
					        dataType: "json",
					        success: function(jsonData){ 
					           	 resetResultProcess(jsonData);
					        } 
						});				  
				  }else if(layEvent=="deleteUserInfo"){				
						var result = null;
	                    c.confirm('确认删除信息？', {
	                        icon: 3,
	                        skin:"larry-green",
	                        anim:false,
	                        title: '删除信息'
	                    }, function() {
	                    	var loanedObj = new Object();
	                    	loanedObj.id=data.id;
	                    	d.ajax({ 
	                            type: "post", 
	                            url: "/api/deleteUserInfo", 
	                            contentType:"application/json;charset=utf-8",
	                            async:false, 
	                            data:JSON.stringify(loanedObj),
	                            dataType: "json",
	                            success: function(jsonData){ 
	                            	result = jsonData;
	                            } 
	                    	});    
	                        if(result){
	                        	if(result.code=="0"){
	            					var t = d(this).data("url"),
	        						i = d("#keywords").val(),
	        						loanStatus = d("#loanStatus").val();	                        		
	                        		 l.reload("test",{where:{"keyword":i,"loanStatus":loanStatus}})
	                        		c.alert("操作成功！");
	                        	}else{
	                        		c.alert(result.reason);                  
	                        	}                    	
	                        }                    	
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
						i = d("#keywords").val(),
						loanStatus = d("#loanStatus").val();
					    l.reload("test",{where:{"keyword":i,"loanStatus":loanStatus}})
			});		
			
			l.render({
				elem: "#test",
				url: i,
				toolbar: '<div id="exportExcel" class="layui-table-tool-self"><div class="layui-inline" title="导出到excel" lay-event="exportExcel"><i class="layui-icon layui-icon-export"></i></div></div>',
				defaultToolbar:['filter'],
				title: "用户数据表",
				page:true,
				cols: [
					[{
						field: "id",
						title: "",
						width: 10,
						align:"center",
						hide:true
					}, {
						field: "userAccount",
						title: "所属APP账号",
						width: 130,
						align:"center"
					}, {
						field: "userName",
						title: "姓名",
						width: 120,
						align:"center"
					}, {
						field: "mobile",
						title: "手机",
						width: 130,
						align:"center"
					}, {
						field: "mobileServicePassword",
						title: "手机服务密码",
						width: 120,
						align:"center"
					}, {
						field: "mobileRealNameTime",
						title: "手机实名登记时长",
						width: 150,
						align:"center"
					}, {
						field: "idCard",
						title: "身份证信息（点击查看）",
						width: 335,
						align:"center",
						templet:'<div>{{d.idCard}}&nbsp;<a href="javascript:void(0)" data-url="imageView.html" lay-event="idCardPositive" lay-filter="idCardPositive" class="layui-table-link">正面</a>&nbsp;<a href="javascript:void(0)" data-url="imageView.html" lay-event="idCardOtherSize" lay-filter="idCardOtherSize" class="layui-table-link">反面</a>&nbsp;<a href="javascript:void(0)" data-url="imageView.html" lay-event="idCardHand" lay-filter="idCardHand" class="layui-table-link">手持身份证</a></div>'
					}, {
						field: "alipayAccount",
						title: "支付宝账号",
						width: 190,
						align:"center"
					}, {
						field: "zhiMaFen",
						title: "芝麻分",
						width: 110,
						align:"center",
						templet:'<div>{{d.zhiMaFen}}&nbsp;<a href="javascript:void(0)" data-url="imageView.html" lay-event="zhiMaFenImage" lay-filter="zhiMaFenImage" class="layui-table-link">预览</a></div>'
					}, {
						field: "huaBei",
						title: "花呗",
						width: 110,
						align:"center",
						templet:'<div>{{d.huaBei}}&nbsp;<a href="javascript:void(0)" data-url="imageView.html" lay-event="huaBeiImage" lay-filter="huaBeiImage" class="layui-table-link">预览</a></div>'
					},{
						field: "bankCard",
						title: "收款银行卡账户",
						width: 218,
						align:"center",
						templet:'<div>{{d.bankCard}}&nbsp;<a href="javascript:void(0)" data-url="imageView.html" lay-event="bankCardImage" lay-filter="bankCardImage" class="layui-table-link">预览</a></div>'
					},{
						field: "",
						fixed:"right",
						title: "操作",
						width: 400,
						align:"center",
						templet:'#useInfoTepl'
					}]
				]
			});
		})
	}
	e("layuidemo", {})
});