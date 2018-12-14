package com.ums.project.controller.appUserInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.queryBean.AppUserInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.ResetPasswordResult;
import com.ums.project.result.TableData;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.vo.AppUserInfoVo;

@RestController
public class AppUserInfoController {
	
	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	@RequestMapping("/api/resetPassword")
	public ResetPasswordResult resetPassword(@RequestParam String id) {
		
		String password = appUserInfoService.resetPassword(id);
		
		ResetPasswordResult result = new ResetPasswordResult();
		result.setPassword(password);
		result.setCode("0");
		result.setReason("");
		result.setTime(System.currentTimeMillis());
		return result;
	}
	
	@RequestMapping("/api/appUserInfos")
	public TableData userInfoPageData(@RequestParam(required=false) String keyword,@RequestParam(required=false) String status,@RequestParam int page,@RequestParam int limit) {
		AppUserInfoQueryBean bean = new AppUserInfoQueryBean();
		DataPage datapage = new DataPage();
		
		bean.setKey(keyword);
		bean.setStatus(status);
		datapage.setLimit(limit);
		datapage.setPage(page);
		Page<AppUserInfo> resutlPage = appUserInfoService.userInfoPageData(bean, datapage);
		
		List<AppUserInfoVo> vos = new ArrayList<AppUserInfoVo>(resutlPage.getContent().size());
		for(AppUserInfo userInfo:resutlPage.getContent()) {
			AppUserInfoVo vo = new AppUserInfoVo();
			vo.setId(userInfo.getId());
			vo.setLoanNum(userInfo.getLoanNum());
			vo.setRegistedTime(userInfo.getRegistedTime());
			vo.setUserAccount(userInfo.getUserAccount());
			vo.setUserName(userInfo.getUserName());
			
			vos.add(vo);
		}
		
		TableData td = new TableData();
		td.setCode("0");
		td.setCount(resutlPage.getTotalElements());
		td.setMsg("");
		td.setData(vos);
		
		return td;
	}
}
