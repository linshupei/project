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

import com.ums.project.entity.UserEmergencyContact;
import com.ums.project.entity.UserInfo;
import com.ums.project.queryBean.UserEmergencyContactQueryBean;
import com.ums.project.repository.UserEmergencyContactRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.UserEmergencyContactService;


/**
 * desc：用户贷款service
 * @author Administrator
 *
 */
@Service("userEmergencyContactService")
@Transactional
public class UserEmergencyContactServiceImpl implements UserEmergencyContactService {

	@Resource(name="userEmergencyContactRepository")
	private UserEmergencyContactRepository userEmergencyContactRepository;
	
	public Page<UserEmergencyContact> userInfoPageData(UserEmergencyContactQueryBean queryBean, DataPage page){
		
	      //规格定义
        Specification<UserEmergencyContact> specification = new Specification<UserEmergencyContact>() {
            @Override
            public Predicate toPredicate(Root<UserEmergencyContact> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>(); 
                Join<UserEmergencyContact, UserInfo> join = root.join("userInfo",JoinType.INNER);
                if(!StringUtils.isEmpty(queryBean.getKey())){
                    Predicate userName = cb.like(join.get("name").as(String.class),"%"+queryBean.getKey()+"%");
                    Predicate mobile = cb.like(join.get("mobile").as(String.class),"%"+queryBean.getKey()+"%");
                    predicates.add(userName);
                    predicates.add(mobile);
                    
                }
                if(!StringUtils.isEmpty(queryBean.getUserInfoId())) {
                	Predicate userInfoId = cb.equal(join.get("id").as(String.class),queryBean.getUserInfoId());
                	 predicates.add(userInfoId);
                }
                return cb.or(predicates.toArray(new Predicate[0]));
            }
        };			
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		Page<UserEmergencyContact> userInfoPageData = userEmergencyContactRepository.findAll(specification,pageable );
		
		return userInfoPageData;
	}


}
