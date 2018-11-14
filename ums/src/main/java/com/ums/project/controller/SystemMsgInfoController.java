package com.ums.project.controller;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.result.BaseResult;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.SystemMsgInfoService;

@RestController
public class SystemMsgInfoController {
	
	@Resource(name="systemMsgInfoService")
	private SystemMsgInfoService systemMsgInfoService;
	
	@RequestMapping("/api/systemMsgReadStatus")
	public BaseResult updateSystemMsgReadStatus(@RequestParam String id,@RequestParam String value){
		systemMsgInfoService.updateSystemMsgReadStatus(id,value);
		
		BaseResult result = new BaseResult();
		result.setCode("0");
		result.setReason("");
		result.setTime(System.currentTimeMillis());
		
		return result;
	}
	
	@RequestMapping("/api/clear/systemMsgReadStatus")
	public BaseResult batchDeleteSystemMsgReadStatus(@RequestParam String ids){
		
		if(ids!=null){
			String[] idStr = ids.split(",");
			systemMsgInfoService.batchDeleteSystemMsgReadStatus(idStr);
		}
		
		BaseResult result = new BaseResult();
		result.setCode("0");
		result.setReason("");
		result.setTime(System.currentTimeMillis());
		
		return result;
	}
	
	@RequestMapping("/api/batch/systemMsgReadStatus")
	public BaseResult batchUpdateSystemMsgReadStatus(@RequestParam String ids){
		if(ids!=null){
			String[] idStr = ids.split(",");
			for(String id: idStr){
				if(id!=null){
				systemMsgInfoService.updateSystemMsgReadStatus(id,"1");
				}
			}
		}
		
		BaseResult result = new BaseResult();
		result.setCode("0");
		result.setReason("");
		result.setTime(System.currentTimeMillis());
		
		return result;
	}
	
	@RequestMapping("/api/systemMsgInfos")
	public TableData systemMsgInfos(@RequestParam int page,@RequestParam int limit) {
		DataPage datapage = new DataPage();
		datapage.setLimit(limit);
		datapage.setPage(page);
		Page<SystemMsgInfo> userInfoPageData = systemMsgInfoService.userInfoPageData(datapage);
		TableData td = new TableData();
		td.setCode("0");
		td.setCount(userInfoPageData.getTotalElements());
		td.setMsg("");
		td.setData(userInfoPageData.getContent());
		
		return td;		
	}	

}
