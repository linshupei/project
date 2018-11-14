package com.ums.project.controller;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.SystemMsgInfoService;

@RestController
public class SystemMsgInfoController {
	
	@Resource(name="systemMsgInfoService")
	private SystemMsgInfoService systemMsgInfoService;
	
	@RequestMapping("/api/systemMsgInfos")
	public TableData systemMsgInfos(@RequestParam int page,@RequestParam int limit) {
		DataPage datapage = new DataPage();
		datapage.setLimit(limit);
		datapage.setPage(page);
		Page<SystemMsgInfo> userInfoPageData = systemMsgInfoService.userInfoPageData(datapage);
		
		TableData td = new TableData();
		td.setCode("0");
		td.setCount(userInfoPageData.getNumber());
		td.setMsg("");
		td.setData(userInfoPageData.getContent());
		
		return td;		
	}	

}
