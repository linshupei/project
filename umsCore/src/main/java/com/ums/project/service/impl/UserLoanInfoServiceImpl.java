package com.ums.project.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

import com.ums.project.entity.UserLoanInfo;
import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.entity.UserInfo;
import com.ums.project.queryBean.UserLoanInfoQueryBean;
import com.ums.project.repository.SystemMsgInfoRepository;
import com.ums.project.repository.UserLoanInfoRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.UserLoanInfoService;


/**
 * desc：用户贷款service
 * @author Administrator
 *
 */
@Service("userLoanInfoService")
@Transactional
public class UserLoanInfoServiceImpl implements UserLoanInfoService {

	@Resource(name="systemMsgInfoRepository")
	private SystemMsgInfoRepository systemMsgInfoRepository;
	
	@Resource(name="userLoanInfoRepository")
	private UserLoanInfoRepository userLoanInfoRepository;	
	
	
	/**
	 * 申请客户资料查询
	 * @param queryBean
	 * @param page
	 * @return
	 */
	public Page<UserLoanInfo> userInfoPageDataPart(UserLoanInfoQueryBean queryBean, DataPage page){
	      //规格定义
        Specification<UserLoanInfo> specification = new Specification<UserLoanInfo>() {
            @Override
            public Predicate toPredicate(Root<UserLoanInfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            	List<Predicate> allPredicates = new ArrayList<>(); 
                Join<UserLoanInfo, UserInfo> join = root.join("userInfo",JoinType.INNER);
                if(!StringUtils.isEmpty(queryBean.getKey())){
                	List<Predicate> predicates = new ArrayList<>(); 
                    Predicate userName = cb.like(join.get("name").as(String.class),"%"+queryBean.getKey()+"%");
                    Predicate mobile = cb.like(join.get("mobile").as(String.class),"%"+queryBean.getKey()+"%");
                    predicates.add(userName);
                    predicates.add(mobile);
                    
                    allPredicates.add(cb.or(predicates.toArray(new Predicate[0])));
                }
                if(!StringUtils.isEmpty(queryBean.getUserInfoId())) {
                	Predicate userInfoId = cb.equal(join.get("id").as(String.class),queryBean.getUserInfoId());
                	allPredicates.add(userInfoId);
                }
                if(!StringUtils.isEmpty(queryBean.getLoanStatus())) {
                	List<Predicate> statusPredicates = new ArrayList<>(); 
                	String[] statusArr = queryBean.getLoanStatus().split(",");
                	for(String status:statusArr){
                		Predicate loanStatus = cb.equal(root.get("status").as(String.class),status);
                		statusPredicates.add(loanStatus);
                	}
                	
                	Predicate or = cb.or(statusPredicates.toArray(new Predicate[0]));
                	allPredicates.add(or);
                }                
                return cb.and(allPredicates.toArray(new Predicate[0]));
            }
        };			
		//Sort sort = new Sort(Sort.Direction.ASC, "status").and(new Sort(Sort.Direction.DESC, "id"));
        Sort sort =new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		Page<UserLoanInfo> userInfoPageData = userLoanInfoRepository.findAll(specification,pageable );
		
		return userInfoPageData;
	}

	
	
	public Page<UserLoanInfo> userInfoPageData(UserLoanInfoQueryBean queryBean, DataPage page){
		
	      //规格定义
        Specification<UserLoanInfo> specification = new Specification<UserLoanInfo>() {
            @Override
            public Predicate toPredicate(Root<UserLoanInfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            	List<Predicate> allPredicates = new ArrayList<>(); 
                Join<UserLoanInfo, UserInfo> join = root.join("userInfo",JoinType.INNER);
                if(!StringUtils.isEmpty(queryBean.getKey())){
                	List<Predicate> predicates = new ArrayList<>(); 
                    Predicate userName = cb.like(join.get("name").as(String.class),"%"+queryBean.getKey()+"%");
                    Predicate mobile = cb.like(join.get("mobile").as(String.class),"%"+queryBean.getKey()+"%");
                    predicates.add(userName);
                    predicates.add(mobile);
                    
                    allPredicates.add(cb.or(predicates.toArray(new Predicate[0])));
                }
                if(!StringUtils.isEmpty(queryBean.getUserInfoId())) {
                	Predicate userInfoId = cb.equal(join.get("id").as(String.class),queryBean.getUserInfoId());
                	allPredicates.add(userInfoId);
                }
                if(!StringUtils.isEmpty(queryBean.getLoanStatus())) {
                	Predicate loanStatus = cb.equal(root.get("status").as(String.class),queryBean.getLoanStatus());
                	allPredicates.add(loanStatus);
                }                
                return cb.and(allPredicates.toArray(new Predicate[0]));
            }
        };			
		Sort sort = new Sort(Sort.Direction.ASC, "status").and(new Sort(Sort.Direction.DESC, "id"));
		Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		Page<UserLoanInfo> userInfoPageData = userLoanInfoRepository.findAll(specification,pageable );
		
		return userInfoPageData;
	}

	@Override
	public UserLoanInfo findById(String id) {
		return userLoanInfoRepository.queryById(id);
	}

	@Override
	public void agreeUserLoanInfo(String id,String loanLimit, String makeLoansLimit, String payDate) {
		userLoanInfoRepository.agreeUserLoanInfo(id,loanLimit,makeLoansLimit,payDate);
	}
	
	/**
	 * 	同意放款
	 * @param id
	 * @param makeLoansLimit
	 * @param payDate
	 */
	@Override
	public void loanDenied(String id) {
		userLoanInfoRepository.loanDenied(id);
	}
	

	/**
	 * 	确认还款操作
	 * @param vo
	 * @return
	 */
	@Override
	public void confirmLoan(String id) {
		userLoanInfoRepository.confirmLoan(id);
	}	
	

	/**
	 * 	更新用户贷款信息
	 * @param vo
	 * @return
	 */
	@Override
	public void updateUserLoanInfo(String id,String loanLimit, String makeLoansLimit, String payDate) {
		userLoanInfoRepository.updateUserLoanInfo(id,loanLimit,makeLoansLimit,payDate);
	}

	@Override
	public List<UserLoanInfo> findOutDateUserLoanInfos() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String date = sdf.format(new Date());
		List<UserLoanInfo> findOutDateUserLoanInfos = userLoanInfoRepository.findOutDateUserLoanInfos(date);
		userLoanInfoRepository.updateOutDateUserLoanInfos(date);
		
		SimpleDateFormat msgTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String msgTimeFormat = msgTime.format(new Date());
		for(UserLoanInfo info:findOutDateUserLoanInfos){
			SystemMsgInfo msgInfo = new SystemMsgInfo();
			msgInfo.setMsgContent("有一笔逾期未还的贷款待处理；姓名："+info.getUserInfo().getName());
			msgInfo.setMsgTime(msgTimeFormat);
			msgInfo.setMsgType("2");
			msgInfo.setReadStatus("0");
			msgInfo.setTipStatus("0");
			msgInfo.setUserLoanInfo(info);
			systemMsgInfoRepository.save(msgInfo);
		}
		
		return findOutDateUserLoanInfos;
	}

	@Override
	public UserLoanInfo findRecentLoanInfo(String userAccount) {
	      //规格定义
      Specification<UserLoanInfo> specification = new Specification<UserLoanInfo>() {
          @Override
          public Predicate toPredicate(Root<UserLoanInfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
              Predicate equal = cb.equal(root.get("userAccount").as(String.class),userAccount);
              return cb.and(equal);
          }
      };			
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(0,1,sort); //页码：前端从1开始，jpa从0开始，做个转换
		Page<UserLoanInfo> userInfoPageData = userLoanInfoRepository.findAll(specification,pageable );
		
		if(userInfoPageData.getTotalElements()>0) {
			return userInfoPageData.getContent().get(0);
		}
		return null;
	}

	@Override
	public void save(UserLoanInfo userLoanInfo) {
		userLoanInfoRepository.save(userLoanInfo);
	}

	@Override
	public UserLoanInfo getById(String loanInfoId) {
		return userLoanInfoRepository.getOne(loanInfoId);
	}

	@Override
	public void updateStatus(String id, String status) {
		userLoanInfoRepository.updateStatus(id,status);
	}

	@Override
	public int findLoaningNum(String userAccount) {
		userLoanInfoRepository.findLoaningNum(userAccount); 
		return 0;
	}

	@Override
	public UserLoanInfo findbyUserInfo(String userInfoId) {
		 return userLoanInfoRepository.findByUserInfo(userInfoId);
	}

	@Override
	public void deleteByUserInfo(String userInfoId) {
		userLoanInfoRepository.deleteByUserInfo(userInfoId);
		
	}

	@Override
	public long findDeniedApplayNum(String userAccount) {
		return userLoanInfoRepository.findDeniedApplayNum(userAccount);
	}



	@Override
	public void loanDenied(String id, String mark) {
		userLoanInfoRepository.loanDenied(id,mark);
	}
	
	@Override
	public UserLoanInfo findRecentSuccessLoanInfo(String userAccount){
	      //规格定义
      Specification<UserLoanInfo> specification = new Specification<UserLoanInfo>() {
          @Override
          public Predicate toPredicate(Root<UserLoanInfo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
              Predicate equal = cb.equal(root.get("userAccount").as(String.class),userAccount);
              Predicate equal2 = cb.equal(root.get("status").as(String.class),"4");
              return cb.and(equal,equal2);
          }
      };			
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(0,1,sort); //页码：前端从1开始，jpa从0开始，做个转换
		Page<UserLoanInfo> userInfoPageData = userLoanInfoRepository.findAll(specification,pageable );
		
		if(userInfoPageData.getTotalElements()>0) {
			return userInfoPageData.getContent().get(0);
		}
		return null;
	}	
}
