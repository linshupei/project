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

import com.ums.project.entity.AppUserCallRecord;
import com.ums.project.entity.AppUserInfo;
import com.ums.project.queryBean.AppUserCallRecordQueryBean;
import com.ums.project.queryBean.AppUserInfoQueryBean;
import com.ums.project.repository.AppUserCallRecordRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.AppUserCallRecordService;
import com.ums.project.service.AppUserInfoService;

@Service("appUserCallRecordService")
@Transactional
public class AppUserCallRecordServiceImpl implements AppUserCallRecordService {

	@Resource(name="appUserCallRecordRepository")
	private AppUserCallRecordRepository appUserCallRecordRepository;
	
	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	public Page<AppUserCallRecord> userInfoPageData(AppUserCallRecordQueryBean queryBean, DataPage page){
		
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		  if(StringUtils.isEmpty(queryBean.getKey())){
			  return appUserCallRecordRepository.findAll(pageable);
		  }
		
		  AppUserInfoQueryBean appUserInfoQueryBean = new AppUserInfoQueryBean();
		  appUserInfoQueryBean.setKey(queryBean.getKey());
		  Page<AppUserInfo> userInfoPageData = appUserInfoService.userInfoPageData(appUserInfoQueryBean, page);
		  List<String> appUserAccounts = new ArrayList<String>();
		  for(AppUserInfo appUserInfo:userInfoPageData.getContent()) {
			  appUserAccounts.add(appUserInfo.getUserAccount());
		  }
		  List<AppUserCallRecord> AppUserCallRecords = new ArrayList<AppUserCallRecord>();
		  if(appUserAccounts.size()>0){
			  AppUserCallRecords = appUserCallRecordRepository.queryAppUserCallRecords(appUserAccounts);
		  }
		  
		return  new PageImpl(AppUserCallRecords,pageable,userInfoPageData.getNumber());
	}

	public void save(List<AppUserCallRecord> saveDatas){
		appUserCallRecordRepository.saveAll(saveDatas);
	}
}
