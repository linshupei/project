package com.ums.project.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.AppUserContactInfo;

/**
 * desc：APP用户通讯录数据操作库
 * @author Administrator
 *
 */
@Repository("appUserContactInfoRepository")
public interface AppUserContactInfoRepository  extends JpaRepository<AppUserContactInfo,String>{

	//@Query("select aui from AppUserContactInfo aui where aui.id = :id")
	//public List<AppUserContactInfo> queryList(String id);
	
	public Page<AppUserContactInfo> findAll(Specification<AppUserContactInfo> spec, Pageable pageable);
	
	@Query("select aui from AppUserContactInfo aui where aui.userAccount in (:userAccounts)")
	public List<AppUserContactInfo> queryAppUserContactInfos(List<String> userAccounts);
	

}
