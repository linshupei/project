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
import com.ums.project.entity.AppUserContactInfo;
import com.ums.project.entity.AppUserInfo;
import com.ums.project.queryBean.AppUserContactInfoQueryBean;
import com.ums.project.queryBean.AppUserInfoQueryBean;
import com.ums.project.repository.AppUserContactInfoRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.AppUserContactInfoService;
import com.ums.project.service.AppUserInfoService;

@Service("appUserContactInfoService")
@Transactional
public class AppUserContactInfoServiceImpl implements AppUserContactInfoService {

	@Resource(name="appUserContactInfoRepository")
	private AppUserContactInfoRepository appUserContactInfoRepository;
	
	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	public Page<AppUserContactInfo> userInfoPageData(AppUserContactInfoQueryBean queryBean, DataPage page){
		
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		  if(StringUtils.isEmpty(queryBean.getKey())){
			  return appUserContactInfoRepository.findAll(pageable);
		  }
		
		  AppUserInfoQueryBean appUserInfoQueryBean = new AppUserInfoQueryBean();
		  Page<AppUserInfo> userInfoPageData = appUserInfoService.userInfoPageData(appUserInfoQueryBean, page);
		  List<String> appUserAccounts = new ArrayList<String>();
		  for(AppUserInfo appUserInfo:userInfoPageData.getContent()) {
			  appUserAccounts.add(appUserInfo.getUserAccount());
		  }
		 
		  List<AppUserContactInfo> appUserContactInfos = appUserContactInfoRepository.queryAppUserContactInfos(appUserAccounts);
		  
		return  new PageImpl(appUserContactInfos,pageable,userInfoPageData.getNumber());
	}

	public void save(List<AppUserContactInfo> saveDatas){
		appUserContactInfoRepository.saveAll(saveDatas);
	}
}
