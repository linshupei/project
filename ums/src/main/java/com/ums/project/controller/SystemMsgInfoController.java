package com.ums.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.entity.UserLoanInfo;
import com.ums.project.result.BaseResult;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.SystemMsgInfoService;
import com.ums.project.service.UserLoanInfoService;
import com.ums.project.vo.SystemMsgInfoVo;

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
		
		List<SystemMsgInfoVo> infos = new ArrayList<SystemMsgInfoVo>(0);
		Page<SystemMsgInfo> userInfoPageData = systemMsgInfoService.userInfoPageData(datapage);
		
		for(SystemMsgInfo data: userInfoPageData) {
			SystemMsgInfoVo vo = new SystemMsgInfoVo();
			vo.setId(data.getId());
			vo.setMsgContent(data.getMsgContent());
			vo.setMsgTime(data.getMsgTime());
			vo.setMsgType(data.getMsgType());
			vo.setReadStatus(data.getReadStatus());
			vo.setTipStatus(data.getTipStatus());
			
			infos.add(vo);
		}
		TableData td = new TableData();
		td.setCode("0");
		td.setCount(userInfoPageData.getTotalElements());
		td.setMsg("");
		td.setData(infos);
		
		return td;		
	}	
	
	/**
	 * 查询申请贷款消息接口
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("/api/query/applyLoanInfo")
	public Map<String,Object> applyLoanInfo() {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code","0");
		resultMap.put("data","");
		SystemMsgInfo systemMsgInfo = systemMsgInfoService.queryApplyLoanMsg();
		if(systemMsgInfo==null) {
			resultMap.put("code","1");
		}else {
			resultMap.put("data", systemMsgInfo);
		}
		return resultMap;
	}		
	
	/**
	 * 逾期贷款接口
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("/api/query/outDateLoanInfo")
	public Map<String,Object> outDateLoanInfo() {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("code","0");
		resultMap.put("data","");
		Page<SystemMsgInfo> infos = systemMsgInfoService.queryOutDateLoanInfoMsg();
		if(infos==null || infos.getTotalElements()<=0) {
			resultMap.put("code","1");
		}else {
			resultMap.put("data", infos.getTotalElements());
		}
		return resultMap;
	}		

	/**
	 *   贷款消息提醒
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("/api/query/loanInfoMsg")
	public Map<String,Object> loanInfoMsg() {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		Map<String,Object> dataMap = new HashMap<String,Object>();
		resultMap.put("code","0");
		resultMap.put("data","");
		
		Page<SystemMsgInfo> infos = systemMsgInfoService.queryOutDateLoanInfoMsg();
		SystemMsgInfo applyLoanMsg = systemMsgInfoService.queryApplyLoanMsg();
		SystemMsgInfo validCodeMsg = systemMsgInfoService.queryValidCodeMsg();
		SystemMsgInfo payMsg = systemMsgInfoService.querypayMsg();
		systemMsgInfoService.queryValidCodeMsg();
		Long number = 0L;
		if(infos!=null && infos.getTotalElements()>0) {
			number = infos.getTotalElements();
		}
		if(applyLoanMsg!=null){
			applyLoanMsg.setUserLoanInfo(null);
		}
		if(validCodeMsg!=null){
			validCodeMsg.setUserLoanInfo(null);
		}		
		if(payMsg!=null){
			payMsg.setUserLoanInfo(null);
		}			 
		dataMap.put("applyLoanMsg",applyLoanMsg);
		dataMap.put("validCodeMsg",validCodeMsg);
		dataMap.put("payMsg",payMsg);
		dataMap.put("outLoan",number);
		resultMap.put("data", dataMap);
		return resultMap;
	}			
}
