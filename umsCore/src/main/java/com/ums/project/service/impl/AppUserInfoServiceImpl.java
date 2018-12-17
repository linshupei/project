package com.ums.project.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.UserInfo;
import com.ums.project.queryBean.AppUserInfoQueryBean;
import com.ums.project.repository.AppUserInfoRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.AppUserInfoService;

@Service("appUserInfoService")
@Transactional
public class AppUserInfoServiceImpl implements AppUserInfoService {

	@Resource(name="appUserInfoRepository")
	private AppUserInfoRepository appUserInfoRepository;
	
	public List<AppUserInfo> findListByUserAccount(String userAccount){
		return appUserInfoRepository.findListByUserAccount(userAccount);
	}
	public Page<AppUserInfo> userInfoPageData(AppUserInfoQueryBean queryBean, DataPage page){
		
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		  if(StringUtils.isEmpty(queryBean.getKey()) && StringUtils.isEmpty(queryBean.getStatus())){
		        Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
			  return appUserInfoRepository.findAll(pageable);
		  }
	      //规格定义
        Specification<AppUserInfo> specification = new Specification<AppUserInfo>() {
            @Override
            public Predicate toPredicate(Root<AppUserInfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            	 List<Predicate> allPredicates = new ArrayList<>(); 
            	 if(!StringUtils.isEmpty(queryBean.getKey()) || !StringUtils.isEmpty(queryBean.getStatus())){
            		 
            		 ListJoin<AppUserInfo, UserInfo> subJoin = root.join(root.getModel().getList("userInfos",UserInfo.class),JoinType.LEFT);
            		 
                     if(!StringUtils.isEmpty(queryBean.getKey())){
                    	 List<Predicate> predicates = new ArrayList<>(); 
                    	 Predicate userAccount = cb.like(root.get("userAccount").as(String.class),"%"+queryBean.getKey()+"%");
                        
                        Predicate userName = cb.like(subJoin.get("name").as(String.class),"%"+queryBean.getKey()+"%");
                        Predicate mobile = cb.like(subJoin.get("mobile").as(String.class),"%"+queryBean.getKey()+"%");
                        predicates.add(userAccount);
                        predicates.add(userName);
                        predicates.add(mobile);
                        
                        Predicate or = cb.or(predicates.toArray(new Predicate[0]));
                        
                        allPredicates.add(or);
                    }
                    if(!StringUtils.isEmpty(queryBean.getStatus())){
                    	Predicate equal = cb.equal(subJoin.get("status").as(String.class),queryBean.getStatus());
                    	allPredicates.add(equal);
                    }            		 
            	 }

                return cb.and(allPredicates.toArray(new Predicate[0]));
            }
        };		
        Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		Page<AppUserInfo> userInfoPageData = appUserInfoRepository.findAll(specification,pageable );
		
		return userInfoPageData;
	}

	@Override
	public String resetPassword(String appUserId) {
		Random random = new Random();
		StringBuilder password = new StringBuilder();
		for(int inx=1;inx<=6;inx++) {
			password.append(random.nextInt(10));
		}
		
		appUserInfoRepository.resetPassword(appUserId,password.toString());
		
		return password.toString();
	}

	@Override
	public AppUserInfo findByUserAccount(String userAccount) {
		return appUserInfoRepository.findByUserAccount(userAccount);
	}
	
	@Override
	public void save(AppUserInfo info) {
		appUserInfoRepository.save(info);
	}

	@Override
	public AppUserInfo findByUserAccountAndPassword(String userAccount, String password) {
		return appUserInfoRepository.findByUserAccountAndLoginPassword(userAccount,password);
	}

	@Override
	public void updateSmsRecordUploadTime(String id, long currentTimeMillis) {
		appUserInfoRepository.updateSmsRecordUploadTime(id,currentTimeMillis+"");
	}

	@Override
	public void updateCallRecordUploadTime(String id, long currentTimeMillis) {
		appUserInfoRepository.updateCallRecordUploadTime(id,currentTimeMillis+"");
	}
	
	@Override
	public void updateContactRecordUploadTime(String id, long currentTimeMillis) {
		appUserInfoRepository.updateContactRecordUploadTime(id,currentTimeMillis+"");
	}
	@Override
	public void updateLoanNum(String id, String loanNum) {
		appUserInfoRepository.updateLoanNum(id,loanNum);
	}
}
