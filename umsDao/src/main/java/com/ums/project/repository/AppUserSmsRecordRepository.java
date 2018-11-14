package com.ums.project.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.AppUserSmsRecord;
/**
 * desc：APP用户短信数据操作库
 * @author Administrator
 *
 */
@Repository("appUserSmsRecordRepository")
public interface AppUserSmsRecordRepository  extends JpaRepository<AppUserSmsRecord,String>{


	
	public Page<AppUserSmsRecord> findAll(Specification<AppUserSmsRecord> spec, Pageable pageable);
	
	@Query("select aui from AppUserSmsRecord aui where aui.userAccount in (:userAccounts)")
	public List<AppUserSmsRecord> queryAppUserSmsRecords(List<String> userAccounts);
	

}
