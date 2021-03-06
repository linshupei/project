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

import com.ums.project.entity.UserWorkUnitInfo;
import com.ums.project.entity.UserInfo;
import com.ums.project.queryBean.UserWorkUnitInfoQueryBean;
import com.ums.project.repository.UserWorkUnitInfoRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.UserWorkUnitInfoService;


/**
 * desc：用户贷款service
 * @author Administrator
 *
 */
@Service("userWorkUnitInfoService")
@Transactional
public class UserWorkUnitInfoServiceImpl implements UserWorkUnitInfoService {

	@Resource(name="userWorkUnitInfoRepository")
	private UserWorkUnitInfoRepository userWorkUnitInfoRepository;
	
	public Page<UserWorkUnitInfo> userInfoPageData(UserWorkUnitInfoQueryBean queryBean, DataPage page){
		
	      //规格定义
        Specification<UserWorkUnitInfo> specification = new Specification<UserWorkUnitInfo>() {
            @Override
            public Predicate toPredicate(Root<UserWorkUnitInfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                List<Predicate> predicates = new ArrayList<>(); 
                Join<UserWorkUnitInfo, UserInfo> join = root.join("userInfo",JoinType.INNER);
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
		Page<UserWorkUnitInfo> userInfoPageData = userWorkUnitInfoRepository.findAll(specification,pageable );
		
		return userInfoPageData;
	}


	public void save(UserWorkUnitInfo workInfo){
		userWorkUnitInfoRepository.save(workInfo);
	}


	@Override
	public void deleteByUserInfo(String userInfoId) {
		userWorkUnitInfoRepository.deleteByUserInfo(userInfoId);
	}
}
