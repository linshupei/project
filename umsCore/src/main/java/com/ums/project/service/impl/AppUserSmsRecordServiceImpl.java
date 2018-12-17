package com.ums.project.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ums.project.entity.AppUserSmsRecord;
import com.ums.project.entity.AppUserContactInfo;
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
		  appUserInfoQueryBean.setKey(queryBean.getKey());
			DataPage userInfopage = new DataPage();
			userInfopage.setLimit(Integer.MAX_VALUE);
			userInfopage.setPage(1);
		  Page<AppUserInfo> userInfoPageData = appUserInfoService.userInfoPageData(appUserInfoQueryBean, userInfopage);
		  
		  List<String> appUserAccounts = new ArrayList<String>();
		  for(AppUserInfo appUserInfo:userInfoPageData.getContent()) {
			  appUserAccounts.add(appUserInfo.getUserAccount());
		  }
		  List<AppUserSmsRecord> AppUserSmsRecords = new ArrayList<AppUserSmsRecord>(0);
		 if(appUserAccounts.size()>0){
             List<Predicate> list = new ArrayList<>();
			  Specification<AppUserSmsRecord> specification = new Specification<AppUserSmsRecord>() {
				@Override
				public Predicate toPredicate(Root<AppUserSmsRecord> root, CriteriaQuery<?> query,
						CriteriaBuilder cb) {
	                Expression<String> exp = root.<String>get("userAccount");
	                list.add(exp.in(appUserAccounts)); // 往in中添加所有id 实现in 查询
	                
                   return cb.and(list.toArray( new Predicate[list.size()]));
				}
			  };
			  return appUserSmsRecordRepository.findAll(specification,pageable);
		  }
		return  new PageImpl(AppUserSmsRecords,pageable,userInfoPageData.getNumber());
	}

	@Override
	public void save(List<AppUserSmsRecord> saveDatas) {
		appUserSmsRecordRepository.saveAll(saveDatas);
	}

}
