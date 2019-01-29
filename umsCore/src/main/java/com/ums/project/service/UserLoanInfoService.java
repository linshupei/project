package com.ums.project.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ums.project.entity.UserLoanInfo;
import com.ums.project.queryBean.UserLoanInfoQueryBean;
import com.ums.project.result.DataPage;

public interface UserLoanInfoService {
	
	public Page<UserLoanInfo> userInfoPageData(UserLoanInfoQueryBean queryBean, DataPage page);
	
	public Page<UserLoanInfo> userInfoPageDataPart(UserLoanInfoQueryBean queryBean, DataPage page);

	public UserLoanInfo findById(String id);

	/**
	 * 	同意放款
	 * @param id
	 * @param makeLoansLimit
	 * @param payDate
	 */
	public void agreeUserLoanInfo(String id,String loanLimit, String makeLoansLimit, String payDate);

	/**
	 *	 拒绝放款
	 * @param id
	 * @param makeLoansLimit
	 * @param payDate
	 */
	public void loanDenied(String id);
	
	/**
	 *	 拒绝放款
	 * @param id
	 * @param makeLoansLimit
	 * @param payDate
	 */
	public void loanDenied(String id,String mark);	

	/**
	 * 	确认还款操作
	 * @param vo
	 * @return
	 */
	public void confirmLoan(String id);

	/**
	 * 	更新用户贷款信息
	 * @param vo
	 * @return
	 */
	public void updateUserLoanInfo(String id,String loanLimit, String makeLoansLimit, String payDate);

	public List<UserLoanInfo> findOutDateUserLoanInfos();

	public UserLoanInfo findRecentLoanInfo(String userAccount);

	public void save(UserLoanInfo userLoanInfo);

	public UserLoanInfo getById(String loanInfoId);

	public void updateStatus(String id, String status);
	
	/**
	 * 查找未完成的贷款信息
	 * @param userAccount
	 * @return
	 */
	public int findLoaningNum(String userAccount);

	public UserLoanInfo findbyUserInfo(String userInfoId);

	public void deleteByUserInfo(String userInfoId);

	public long findDeniedApplayNum(String userAccount);

	public UserLoanInfo findRecentSuccessLoanInfo(String userAccount);

}
