package com.ums.project.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.UserLiabilitiesInfo;

/**
 * desc：用户贷款信息数据操作库
 * @author Administrator
 *
 */
@Repository("userLiabilitiesInfoRepository")
public interface UserLiabilitiesInfoRepository  extends JpaRepository<UserLiabilitiesInfo,String>{
	

	public Page<UserLiabilitiesInfo> findAll(Specification<UserLiabilitiesInfo> spec, Pageable pageable);

	@Modifying
	@Query("delete from UserLiabilitiesInfo where userInfo.id=:userInfoId")
	public void deleteByUserInfo(@Param("userInfoId") String userInfoId);


}
