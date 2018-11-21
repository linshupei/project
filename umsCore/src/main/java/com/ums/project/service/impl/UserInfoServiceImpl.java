package com.ums.project.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
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
import com.ums.project.entity.UserLoanInfo;
import com.ums.project.queryBean.AppUserInfoQueryBean;
import com.ums.project.queryBean.UserInfoQueryBean;
import com.ums.project.repository.AppUserInfoRepository;
import com.ums.project.repository.UserInfoRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.UserInfoService;

/**
 * desc：用户信息service处理
 * @author Administrator
 *
 */
@Service("userInfoService")
@Transactional
public class UserInfoServiceImpl implements UserInfoService {

	@Resource(name="userInfoRepository")
	private UserInfoRepository userInfoRepository;
	
	/**
	 * 分页查询用户信息列表
	 */
	public Page<UserInfo> userInfoPageData(UserInfoQueryBean queryBean, DataPage page){
		
		//排序规则
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		//没有查询条件
		if(StringUtils.isEmpty(queryBean.getKey())){
			 Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
			return userInfoRepository.findAll(pageable);
		}
	      //规格定义
        Specification<UserInfo> specification = new Specification<UserInfo>() {
            @Override
            public Predicate toPredicate(Root<UserInfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>(); 
                if(!StringUtils.isEmpty(queryBean.getKey())){
                	Join<UserInfo, AppUserInfo> join = root.join("appUserInfo",JoinType.INNER);
                    Predicate userAccount = cb.like(join.get("userAccount").as(String.class),"%"+queryBean.getKey()+"%");
                    Predicate userName = cb.like(root.get("name").as(String.class),"%"+queryBean.getKey()+"%");
                    Predicate mobile = cb.like(root.get("mobile").as(String.class),"%"+queryBean.getKey()+"%");
                    
  /*                  Join<UserInfo, UserLoanInfo> loan = root.join("u",JoinType.INNER);
                    cb.like(x, pattern)*/
                    predicates.add(userAccount);
                    predicates.add(userName);
                    predicates.add(mobile);
                    
                }
                if(!StringUtils.isEmpty(queryBean.getId())) {
                	Predicate equal = cb.equal(root.get("id").as(String.class),queryBean.getId());
                	 predicates.add(equal);
                }
                return cb.or(predicates.toArray(new Predicate[0]));
            }
        };		
        Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		Page<UserInfo> userInfoPageData = userInfoRepository.findAll(specification,pageable );
		
		return userInfoPageData;
	}

	@Override
	public void save(UserInfo userInfo) {
		userInfoRepository.save(userInfo);
	}
}
