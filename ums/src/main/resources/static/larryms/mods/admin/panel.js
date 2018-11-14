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
		layer.tips(this.value + " " + this.name + "：" + e.elem.checked, e.othis)
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
					var r = {
						id: l
					};
					if (a == "") {
						u.alert("实际项目中请设置data-url参数为后端处理程序路径,查看源码注释")
					} else {
						c.post(a, r, function(t) {})
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
					var r = {
						id: l
					};
					u.confirm("你确定要执行批量删除吗？", {
						icon: 3,
						title: "批量删除提示！"
					}, function() {
						if (a == "") {
							u.alert("实际项目中请设置data-url参数为后端处理程序路径,具体方法已写在源码注释中")
						} else {
							c.post(a, r, function(t) {})
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
				height: "full-155",
				page: true,
				limits: [15, 30, 45, 60, 75, 90, 105, 120],
				limit: 10,
				cols: [
					[{
						type: "checkbox",
						fixed: "left",
						width: 40
					}, {
						field: "title",
						title: "标题内容",
						minWidth: 260,
						align: "left"
					}, {
						field: "type",
						title: "消息类别",
						width: 180,
						align: "center",
						templet: function(t) {
							if (t.type == "1") {
								return '<cite style="color:#01AAED;">申请贷款消息</cite>'
							} else if (t.type == "2") {
								return '<cite style="color:#FF5722">贷款逾期未还消息</cite>'
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