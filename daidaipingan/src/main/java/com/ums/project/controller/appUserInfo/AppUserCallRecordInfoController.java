package com.ums.project.controller.appUserInfo;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.AppUserCallRecord;
import com.ums.project.queryBean.AppUserCallRecordQueryBean;
import com.ums.project.queryBean.AppUserContactInfoQueryBean;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.AppUserCallRecordService;
import com.ums.project.vo.AppUserCallRecordInfoVo;

@RestController
public class AppUserCallRecordInfoController {
	
	@Resource(name="appUserCallRecordService")
	private AppUserCallRecordService appUserCallRecordService;
	
	@RequestMapping("/api/appUserCallRecordInfos")
	public TableData AppUserCallRecordInfoPageData(@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		AppUserCallRecordQueryBean queryBean = new AppUserCallRecordQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		
		List<AppUserCallRecordInfoVo> userInfos = new ArrayList<AppUserCallRecordInfoVo>();
		Page<AppUserCallRecord> userInfoPageData = appUserCallRecordService.userInfoPageData(queryBean, datapage);
		for(AppUserCallRecord record:userInfoPageData) {
			AppUserCallRecordInfoVo vo = new AppUserCallRecordInfoVo();
			
			vo.setId(record.getId());
			vo.setUserAccount(record.getUserAccount());
			vo.setCallTime(record.getCallTime());
			vo.setCallPhone(record.getCallPhone());
			vo.setCalledPhone(record.getCalledPhone());
			vo.setCallName(record.getCallName());			
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
