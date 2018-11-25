package com.ums.project.controller.appUserInfo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.AppUserContactInfo;
import com.ums.project.queryBean.AppUserContactInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.AppUserContactInfoService;
import com.ums.project.vo.AppUserContactInfoVo;

@RestController
public class AppUserContactInfoController {
	
	@Resource(name="appUserContactInfoService")
	private AppUserContactInfoService appUserContactInfoService;
	
	@RequestMapping("/api/appUserContactInfos")
	public TableData AppUserContactInfoPageData(@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		AppUserContactInfoQueryBean queryBean = new AppUserContactInfoQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		
		List<AppUserContactInfoVo> userInfos = new ArrayList<AppUserContactInfoVo>();
		Page<AppUserContactInfo> userInfoPageData = appUserContactInfoService.userInfoPageData(queryBean, datapage);
		for(AppUserContactInfo info:userInfoPageData) {
			AppUserContactInfoVo vo = new AppUserContactInfoVo();
			vo.setId(info.getId());
			vo.setMobile(info.getMobile());
			vo.setUserAccount(info.getUserAccount());
			vo.setName(info.getName());		
			
			userInfos.add(vo);
		}
		
		TableData td = new TableData();
		td.setCode("0");
		td.setCount(userInfoPageData.getTotalElements());
		td.setMsg("");
		td.setData(userInfos);
		
		return td;
	}
}
