package com.ums.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.LiabilitiesPlatformInfo;

/**
 * desc：负债平台
 * @author Administrator
 *
 */
@Repository("liabilitiesPlatformInfoRepository")
public interface LiabilitiesPlatformInfoRepository  extends JpaRepository<LiabilitiesPlatformInfo,String>{
	

}
