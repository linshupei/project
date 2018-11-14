package com.ums.project.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ums.project.entity.AppUserCallRecord;
/**
 * desc：APP用户短信数据操作库
 * @author Administrator
 *
 */
@Repository("appUserCallRecordRepository")
public interface AppUserCallRecordRepository  extends JpaRepository<AppUserCallRecord,String>{


	
	public Page<AppUserCallRecord> findAll(Specification<AppUserCallRecord> spec, Pageable pageable);
	
	@Query("select aui from AppUserCallRecord aui where aui.userAccount in (:userAccounts)")
	public List<AppUserCallRecord> queryAppUserCallRecords(List<String> userAccounts);
	

}
