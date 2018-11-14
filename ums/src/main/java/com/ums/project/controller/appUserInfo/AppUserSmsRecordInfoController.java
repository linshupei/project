package com.ums.project.controller.appUserInfo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.queryBean.AppUserContactInfoQueryBean;
import com.ums.project.queryBean.AppUserSmsRecordQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.AppUserSmsRecordService;
import com.ums.project.vo.AppUserSmsRecordInfoVo;

@RestController
public class AppUserSmsRecordInfoController {
	
	@Resource(name="appUserSmsRecordService")
	private AppUserSmsRecordService appUserSmsRecordService;
	
	@RequestMapping("/api/appUserSmsRecordInfos")
	public TableData AppUserSmsRecordInfoPageData(@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		AppUserSmsRecordQueryBean queryBean = new AppUserSmsRecordQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		
		List<AppUserSmsRecordInfoVo> userInfos = new ArrayList<AppUserSmsRecordInfoVo>();
		Page<AppUserSmsRecord> userInfoPageData = appUserSmsRecordService.userInfoPageData(queryBean, datapage);
		
		for(AppUserSmsRecord record:userInfoPageData) {
			AppUserSmsRecordInfoVo vo = new AppUserSmsRecordInfoVo();
			vo.setId(record.getId());
			vo.setUserAccount(record.getUserAccount());
			vo.setSendTime(record.getSendTimeFormat());
			vo.setSendPhone(record.getSendPhone());
			vo.setSmsContent(record.getSmsContent());
			userInfos.add(vo);
		}
		
		TableData td = new TableData();
		td.setCode("0");
		td.setCount(userInfoPageData.getNumber());
		td.setMsg("");
		td.setData(userInfos);
		
		return td;
	}
}
