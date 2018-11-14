package com.ums.project.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.entity.AppUserInfo;
import com.ums.project.queryBean.AppUserSmsRecordQueryBean;
import com.ums.project.queryBean.AppUserInfoQueryBean;
import com.ums.project.repository.AppUserSmsRecordRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.AppUserSmsRecordService;
import com.ums.project.service.AppUserInfoService;

@Service("appUserSmsRecordService")
@Transactional
public class AppUserSmsRecordServiceImpl implements AppUserSmsRecordService {

	@Resource(name="appUserSmsRecordRepository")
	private AppUserSmsRecordRepository appUserSmsRecordRepository;
	
	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	public Page<AppUserSmsRecord> userInfoPageData(AppUserSmsRecordQueryBean queryBean, DataPage page){
		
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		  if(StringUtils.isEmpty(queryBean.getKey())){
			  return appUserSmsRecordRepository.findAll(pageable);
		  }
		
		  AppUserInfoQueryBean appUserInfoQueryBean = new AppUserInfoQueryBean();
		  Page<AppUserInfo> userInfoPageData = appUserInfoService.userInfoPageData(appUserInfoQueryBean, page);
		  List<String> appUserAccounts = new ArrayList<String>();
		  for(AppUserInfo appUserInfo:userInfoPageData.getContent()) {
			  appUserAccounts.add(appUserInfo.getUserAccount());
		  }
		 
		  List<AppUserSmsRecord> AppUserSmsRecords = appUserSmsRecordRepository.queryAppUserSmsRecords(appUserAccounts);
		  
		return  new PageImpl(AppUserSmsRecords,pageable,userInfoPageData.getNumber());
	}

}
