layui.define(["jquery", "table", "larryms","laytpl"], function(t) {
	var c = layui.$,
		s = layui.table,
		u = layui.larryms;
	c(".layui-btn-container .layui-btn").on("click", function() {
		var t = c(this).data("type"),
			e = c(this).data("url"),
			i = c(this).children("cite").text();
		l[t] ? l[t].call(this) : ""
	});
	layui.use(["table", "laytpl", "form"], function() {
	  	var t = layui.form;
		t.on("switch(systemMsgInfoC)", function(e) {
			//layer.tips(this.value + " " + this.name + "：" + e.elem.checked, e.othis)
			c.ajax({ 
		        type: "post", 
		        url: "/api/systemMsgReadStatus", 
		        async:false, 
		        data:{"id":e.elem.value,"value":e.elem.checked?"1":"0"},
		        dataType: "json",
		        success: function(jsonData){ 
		        } 
			});		
		});  	
	});

	
	var l = {
		reading: function() {
			var t = c(this).data("id"),
				e = s.checkStatus(t),
				i = e.data,
				l = [];
			var a = c(this).data("url");
			if (i.length > 0) {
				for (var n in i) {
					l.push(i[n].id)
				}
				if (l.length > 0) {
					if (a == "") {
						 
					} else {
						c.ajax({ 
					        type: "post", 
					        url: a, 
					        async:false, 
					        data:{"ids":JSON.stringify(l)},
					        dataType: "json",
					        success: function(jsonData){ 
					        	s.reload("lay-filter");
					        } 
						});
					}
				}
			} else {
				u.msg("请至少选择一项，进行标记操作")
			}
		},
		del: function() {
			var t = c(this).data("id"),
				e = s.checkStatus(t),
				i = e.data,
				l = [];
			var a = c(this).data("url");
			if (i.length > 0) {
				for (var n in i) {
					l.push(i[n].id)
				}
				if (l.length > 0) {
					u.confirm("你确定要执行批量删除吗？", {
						icon: 3,
						title: "批量删除提示！"
					}, function() {
						if (a == "") {
							
						} else {
							c.ajax({ 
						        type: "post", 
						        url: a, 
						        async:false, 
						        data:{"ids":JSON.stringify(l)},
						        dataType: "json",
						        success: function(jsonData){ 
						        	s.reload("message");
						        } 
							});	
						}
					})
				}
			} else {
				u.msg("请至少选择一项，进行删除操作")
			}
		}
	};
	if (layui.cache.identified == "message") {
		var e = c("#message").data("url"),
			i = s.render({
				elem: "#message",
				id: "message",
				cellMinWidth: 95,
				url: e,
				method: "get",
				page: true,
				limit: 10,
				cols: [
					[{
						type: "checkbox",
						fixed: "left",
						width: 40
					}, {
						field: "msgContent",
						title: "标题内容",
						minWidth: 260,
						align: "left"
					}, {
						field: "msgType",
						title: "消息类别",
						width: 180,
						align: "center",
						templet: function(t) {
							if (t.msgType == "1") {
								return '<cite style="color:#01AAED;">申请贷款消息</cite>'
							} else if (t.msgType == "2") {
								return '<cite style="color:#01AAED">贷款逾期未还消息</cite>'
							}else if (t.msgType == "3") {
								return '<cite style="color:#01AAED">输入验证码消息</cite>'
							}else if (t.msgType == "4") {
								return '<cite style="color:#01AAED">用户还款消息</cite>'
							}
						}
					}, {
						field: "readStatus",
						title: "状态",
						width: 200,
						align: "center",
						templet:"#systemMsgInfoTepl"
					}, {
						field: "msgTime",
						title: "时间",
						width: 200,
						align: "center"
					}]
				]
			})
	}
	t("panel", {})
});