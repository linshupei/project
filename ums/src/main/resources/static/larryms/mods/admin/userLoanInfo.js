

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
				i = d("#userLoanInfo").data("url"),
				table = layui.table,
				layer = layui.layer;
				
			l.on("tool(userLoanInfo)",function(obj){
				  var data = obj.data; //获得当前行数据
				  var layEvent = obj.event; 
				  var tr = obj.tr;  
				  
				if (layEvent == "setLoaned") {				
					var result = null;
                    c.confirm('确认已还款？', {
                        icon: 3,
                        skin:"larry-green",
                        anim:false,
                        title: '确认还款'
                    }, function() {
                    	var loanedObj = new Object();
                    	loanedObj.id=data.id;
                    	d.ajax({ 
                            type: "post", 
                            url: "/api/confirmLoan", 
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
                        		table.reload("userLoanInfo",getReloadOptions());
                        		c.alert("操作成功！");
                        	}else{
                        		c.alert(result.reason);                  
                        	}                    	
                        }                    	
                    });
				}else if (layEvent == "bankCardImage") {
				      var a = c.open({
							title: "银行卡信息",
							type: 2,
							area: ["760px", "550px"],
							content: data.bankCardImage
					  });
				}else if (layEvent == "agreeLoan") {
					var i = d(this).data("url") + "?id=" + data.id;
					var l = c.open({
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
				}else  if (layEvent == "Loaned") {
					var i = d(this).data("url") + "?id=" + data.id;
					var l = c.open({
						type: 2,
						skin: "larryms-navy",
						title: "查看",
						area: ["500px", "400px"],
						shadeClose: true,
						shade: .2,
						offset: "20px",
						maxmin: true,
						btnAlign: "c",
						content: i,
						success: function(e, t) {}
					})
				}else  if (layEvent == "loanView") {
					var i = d(this).data("url") + "?id=" + data.id;
					var l = c.open({
						type: 2,
						skin: "larryms-navy",
						title: "查看",
						area: ["500px", "400px"],
						shadeClose: true,
						shade: .2,
						offset: "20px",
						maxmin: true,
						btnAlign: "c",
						content: i,
						success: function(e, t) {}
					})
				}else  if (layEvent == "loanEdit") {
					var i = d(this).data("url") + "?id=" + data.id;
					var l = c.open({
						type: 2,
						skin: "larryms-navy",
						title: "编辑",
						area: ["500px", "400px"],
						shadeClose: true,
						shade: .2,
						offset: "20px",
						maxmin: true,
						btnAlign: "c",
						content: i,
						success: function(e, t) {}
					})
				}else  if (layEvent == "loanDenied") {
					var result = null;
                    c.confirm('确认拒绝该贷款申请吗', {
                        icon: 3,
                        anim:false,
                        title: '申请拒绝'
                    }, function() {
                    	var loanDeniedObj = new Object();
                    	loanDeniedObj.id=data.id;
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
                        		table.reload("userLoanInfo",getReloadOptions());
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
			/**d("#searchBtn").on("click", function() {
					var t = d(this).data("url"),
						i = d("#keywords").val();
					    l.reload("userLoanInfo",getReloadOptions())
			});**/	 
				   
			l.render({
				elem: "#userLoanInfo",
				url: i,
				toolbar: "#toolbarDemo",
				title: "用户贷款信息表",
				page:true,
				where:getReloadOptions().where,
				cols: [
					[{
						field: "id",
						title: "",
						width: 120,
						align:"center",
						hide:true
					}, {
						field: "userName",
						title: "用户名",
						width: 120,
						align:"center"
					}, {
						field: "mobile",
						title: "手机",
						width: 130,
						align:"center"
					},{
						field: "loanLimit",
						title: "申请贷款金额",
						width: 150,
						align:"center",
						templet:'<div>{{d.loanLimit}}&nbsp;元</div>'
					},{
						field: "makeLoansLimit",
						title: "实际放款金额",
						width: 150,
						align:"center",
						templet:'<div>{{d.makeLoansLimit}}&nbsp;元</div>'
					},{
						field: "bankCard",
						title: "收款银行卡账户",
						width: 230,
						align:"center",
						templet:'<div>{{d.bankCard}}&nbsp;<a href="javascript:void(0)" lay-event="bankCardImage" lay-filter="bankCardImage" class="layui-table-link">预览</a></div>'
					},{
						field: "status",
						title: "状态",
						width: 100,
						align:"center",
						templet:"#loanStatusTpl"
					},{
						field: "applyDate",
						title: "申请贷款时间",
						width: 218,
						align:"center"
					},{
						field: "payDate",
						title: "还款日期",
						width: 180,
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