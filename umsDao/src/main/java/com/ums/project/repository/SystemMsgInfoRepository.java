package com.ums.project.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.SystemMsgInfo;

/**
 * desc：系统消息数据操作库
 * @author Administrator
 *
 */
@Repository("systemMsgInfoRepository")
public interface SystemMsgInfoRepository  extends JpaRepository<SystemMsgInfo,String>{
	

	public Page<SystemMsgInfo> findAll(Pageable pageable);

	@Modifying
	@Query("update SystemMsgInfo set readStatus=:value where id = :id")
	public void updateSystemMsgReadStatus(String id, String value);

	@Modifying
	@Query("delete from SystemMsgInfo where id in (:idStr)")	
	public void batchDeleteSystemMsgReadStatus(String[] idStr);


}
