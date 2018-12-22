

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
				}else if(layEvent=="deleteUserLoanInfo"){				
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
                            url: "/api/deleteUserLoanInfo", 
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
        						i = d("#keywords").val();             
            					var reuqestParam = getReloadOptions();
            					if(!reuqestParam.keyword){
            						reuqestParam.keyword = i;
            					}
            					table.reload("userLoanInfoPart",reuqestParam);
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
					i = d("#keywords").val();
				var reuqestParam = getReloadOptions();
				if(!reuqestParam.keyword){
					reuqestParam.keyword = i;
				}
				    l.reload("userLoanInfoPart",reuqestParam);
			});		
			
			var infoType= getReloadOptions().where.infoType;
			if(infoType && "show"==infoType){
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
							title: "申请日期",
							align:"center"
						},{
							field: "payDate",
							title: "到期日期",
							align:"center"
						},{
							field: "makeLoansLimit",
							title: "借款金额",
							align:"center"
						},{
							fixed: "right",
							title: "操作",
							templet: "#userLoanInfoTpl",
							align:"center"
						}]
					]
				});			
			}else{
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
							title: "申请日期",
							align:"center"
						},{
							fixed: "right",
							title: "操作",
							templet: "#userLoanInfoTpl",
							align:"center"
						}]
					]
				});			
			}

		})
	}
	e("layuidemo", {})
});