package com.ums.project.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.SystemMsgInfo;

/**
 * desc：系统消息数据操作库
 * @author Administrator
 *
 */
@Repository("systemMsgInfoRepository")
public interface SystemMsgInfoRepository  extends JpaRepository<SystemMsgInfo,String>{
	

	public Page<SystemMsgInfo> findAll(Specification<SystemMsgInfo> spec,Pageable pageable);
	
	public Page<SystemMsgInfo> findAll(Pageable pageable);
	
	//public Page<SystemMsgInfo> findAll(Specification<SystemMsgInfo> spec);

	@Modifying
	@Query("update SystemMsgInfo set readStatus=:value where id = :id")
	public void updateSystemMsgReadStatus(@Param("id") String id,@Param("value") String value);

	@Modifying
	@Query("delete from SystemMsgInfo where id in (:idStr)")	
	public void batchDeleteSystemMsgReadStatus(@Param("idStr") String[] idStr);

	@Modifying
	@Query("update SystemMsgInfo set tipStatus=:value where id in (:tipList)")
	public void updateSystemMsgTipStatus(@Param("tipList")  List<String> tipList,@Param("value") String value);

	@Modifying
	@Query("delete from SystemMsgInfo where userLoanInfo.id=:userLoanInfoId")
	public void deleteByUserLoanInfoId(@Param("userLoanInfoId") String userLoanInfoId);
	

}
