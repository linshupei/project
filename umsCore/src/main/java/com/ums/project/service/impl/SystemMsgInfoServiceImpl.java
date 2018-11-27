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

import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.entity.UserLoanInfo;
import com.ums.project.repository.SystemMsgInfoRepository;
import com.ums.project.result.DataPage;
import com.ums.project.service.SystemMsgInfoService;


/**
 * desc：系统消息service
 * @author Administrator
 *
 */
@Service("systemMsgInfoService")
@Transactional
public class SystemMsgInfoServiceImpl implements SystemMsgInfoService {

	@Resource(name="systemMsgInfoRepository")
	private SystemMsgInfoRepository systemMsgInfoRepository;
	
	public Page<SystemMsgInfo> userInfoPageData(DataPage page){
			
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page.getPage()-1,page.getLimit(),sort); //页码：前端从1开始，jpa从0开始，做个转换
		Page<SystemMsgInfo> userInfoPageData = systemMsgInfoRepository.findAll(pageable );
		
		return userInfoPageData;
	}

	@Override
	public void updateSystemMsgReadStatus(String id, String value) {
		systemMsgInfoRepository.updateSystemMsgReadStatus(id,value);
	}

	@Override
	public void batchDeleteSystemMsgReadStatus(String[] idStr) {
		systemMsgInfoRepository.batchDeleteSystemMsgReadStatus(idStr);
	}

	/**
	 * 查询还款操作
	 * @return
	 */
	public SystemMsgInfo querypayMsg() {
		
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(0,1,sort); //页码：前端从1开始，jpa从0开始，做个转换
		
		Specification<SystemMsgInfo> specification = new Specification<SystemMsgInfo>() {
			@Override
			public Predicate toPredicate(Root<SystemMsgInfo> root, CriteriaQuery<?> query,
					CriteriaBuilder cb) {
				Join<SystemMsgInfo, UserLoanInfo> join = root.join("userLoanInfo",JoinType.INNER);
				Predicate equal = cb.equal(root.get("msgType").as(String.class),"4");
				Predicate equal2 = cb.equal(root.get("tipStatus").as(String.class),"0");
				
				Predicate equal3 = cb.equal(join.get("status").as(String.class),"5");
				//Predicate equal4 = cb.equal(join.get("status").as(String.class),"3");
				 Predicate and1 = cb.and(equal,equal2);
				 Predicate or2 = cb.or(equal3);
				 return cb.and(and1,or2);
			}
		};
		
		Page<SystemMsgInfo> userInfoPageData = systemMsgInfoRepository.findAll(specification,pageable);
		if(userInfoPageData.getTotalElements()>0) {
			List<String> tipList = new ArrayList<String>();
			tipList.add(userInfoPageData.getContent().get(0).getId());
			systemMsgInfoRepository.updateSystemMsgTipStatus(tipList, "1");			
			return userInfoPageData.getContent().get(0);
		}
		return null;
	}
	
	/**
	 * 查询输入验证码消息
	 */
	public SystemMsgInfo queryValidCodeMsg() {
		
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(0,1,sort); //页码：前端从1开始，jpa从0开始，做个转换
		
		
		
		
		Specification<SystemMsgInfo> specification = new Specification<SystemMsgInfo>() {
			@Override
			public Predicate toPredicate(Root<SystemMsgInfo> root, CriteriaQuery<?> query,
					CriteriaBuilder cb) {
				Join<SystemMsgInfo, UserLoanInfo> join = root.join("userLoanInfo",JoinType.INNER);
				Predicate equal = cb.equal(root.get("msgType").as(String.class),"3");
				Predicate equal2 = cb.equal(root.get("tipStatus").as(String.class),"0");
				Predicate equal3 = cb.equal(join.get("status").as(String.class),"0");
				return cb.and(equal,equal2,equal3);
			}
		};
		
		Page<SystemMsgInfo> userInfoPageData = systemMsgInfoRepository.findAll(specification,pageable);
		if(userInfoPageData.getTotalElements()>0) {
			List<String> tipList = new ArrayList<String>();
			tipList.add(userInfoPageData.getContent().get(0).getId());
			systemMsgInfoRepository.updateSystemMsgTipStatus(tipList, "1");
			return userInfoPageData.getContent().get(0);
		}
		return null;
	}
	/**
	 * 查询贷款申请消息
	 * @return
	 */
	public SystemMsgInfo queryApplyLoanMsg() {
		
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(0,1,sort); //页码：前端从1开始，jpa从0开始，做个转换
		
		
		
		
		Specification<SystemMsgInfo> specification = new Specification<SystemMsgInfo>() {
			@Override
			public Predicate toPredicate(Root<SystemMsgInfo> root, CriteriaQuery<?> query,
					CriteriaBuilder cb) {
				Join<SystemMsgInfo, UserLoanInfo> join = root.join("userLoanInfo",JoinType.INNER);
				Predicate equal = cb.equal(root.get("msgType").as(String.class),"1");
				Predicate equal2 = cb.equal(root.get("tipStatus").as(String.class),"0");
				Predicate equal3 = cb.equal(join.get("status").as(String.class),"0");
				return cb.and(equal,equal2,equal3);
			}
		};
		
		Page<SystemMsgInfo> userInfoPageData = systemMsgInfoRepository.findAll(specification,pageable);
		if(userInfoPageData.getTotalElements()>0) {
			List<String> tipList = new ArrayList<String>();
			tipList.add(userInfoPageData.getContent().get(0).getId());
			systemMsgInfoRepository.updateSystemMsgTipStatus(tipList, "1");
			return userInfoPageData.getContent().get(0);
		}
		return null;
	}
	/**
	 * 查询贷款逾期消息
	 * @return
	 */
	public Page<SystemMsgInfo> queryOutDateLoanInfoMsg(){
		Sort sort = new Sort(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(0,Integer.MAX_VALUE,sort); //页码：前端从1开始，jpa从0开始，做个转换
		
		Specification<SystemMsgInfo> specification = new Specification<SystemMsgInfo>() {
			@Override
			public Predicate toPredicate(Root<SystemMsgInfo> root, CriteriaQuery<?> query,
					CriteriaBuilder cb) {
				Join<SystemMsgInfo, UserLoanInfo> join = root.join("userLoanInfo",JoinType.INNER);
				Predicate equal = cb.equal(root.get("msgType").as(String.class),"2");
				Predicate equal2 = cb.equal(root.get("tipStatus").as(String.class),"0");
				Predicate equal3 = cb.equal(join.get("status").as(String.class),"3");
				return cb.and(equal,equal2,equal3);
			}
		};
		
		Page<SystemMsgInfo> findAll = systemMsgInfoRepository.findAll(specification,pageable);
		if(findAll.getTotalElements()>0){
			List<String> tipList = new ArrayList<String>();
			List<SystemMsgInfo> contents = findAll.getContent();
			for(SystemMsgInfo content:contents){
				tipList.add(content.getId());
			}
			systemMsgInfoRepository.updateSystemMsgTipStatus(tipList, "1");
		}
		
		return findAll;
	}

	@Override
	public void save(SystemMsgInfo msg) {
		systemMsgInfoRepository.save(msg);
	}
}
