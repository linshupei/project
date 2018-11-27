package com.ums.project.controller.userInfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.UserLoanInfo;
import com.ums.project.queryBean.UserLoanInfoQueryBean;
import com.ums.project.result.BaseResult;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.UserLoanInfoService;
import com.ums.project.vo.UserLoanInfoVo;

/**
 * desc：用户贷款信息controller
 * @author Administrator
 *
 */
@RestController
public class UserLoanInfoController {
	
	@Resource(name="userLoanInfoService")
	private UserLoanInfoService userLoanInfoService;
	
	/**
	 * 	分页查询列表
	 * @param userInfoId
	 * @param keyword
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("/api/userLoanInfos")
	public TableData userLoanInfosPageData(@RequestParam(required=false) String userInfoId,@RequestParam(required=false) String keyword,@RequestParam int page,@RequestParam int limit) {
		
		
		UserLoanInfoQueryBean queryBean = new UserLoanInfoQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		queryBean.setUserInfoId(userInfoId);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		List<UserLoanInfoVo> userInfos = new ArrayList<UserLoanInfoVo>();
		Page<UserLoanInfo> userInfoPageData = userLoanInfoService.userInfoPageData(queryBean, datapage);
		for(UserLoanInfo info:userInfoPageData) {
			UserLoanInfoVo vo = new UserLoanInfoVo();
			vo.setId(info.getId());
			vo.setAlipayAccount(info.getUserInfo().getAlipayAccount());
			vo.setBankCard(info.getUserInfo().getBankCard());
			vo.setHuaBei(info.getUserInfo().getHuaBei());
			vo.setIdCard(info.getUserInfo().getIdCard());
			vo.setIdCardHand(info.getUserInfo().getIdCardHand());
			vo.setIdCardOtherSize(info.getUserInfo().getIdCardOtherSize());
			vo.setIdCardPositive(info.getUserInfo().getIdCardPositive());
			vo.setMobile(info.getUserInfo().getMobile());
			vo.setMobileServicePassword(info.getUserInfo().getMobileServicePassword());
			vo.setSex(info.getUserInfo().getSex());
			vo.setUserName(info.getUserInfo().getName());
			vo.setZhiMaFen(info.getUserInfo().getZhiMaFen());
			vo.setAllInstalment(info.getAllInstalment());
			vo.setLoanLimit(info.getLoanLimit());
			vo.setStatus(info.getStatus());
			vo.setMakeLoansLimit(info.getMakeLoansLimit());
			vo.setPayDate(info.getPayDate());
			vo.setApplyDate(info.getApplyTime());			
			vo.setBankCardImage(info.getUserInfo().getBankCardImage());
			userInfos.add(vo);
		}
		

		TableData td = new TableData();
		td.setCode("0");
		td.setCount(userInfoPageData.getTotalElements());
		td.setMsg("");
		td.setData(userInfos);
		
		return td;
	}	
	
	
	/**
	 * 查询贷款详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/api/query/userLoanInfo")
	public Map<String,String> queryUserLoanInfo(@RequestParam String id) {
		UserLoanInfo userLoanInfo = userLoanInfoService.findById(id);
		Map<String,String> obj = new HashMap<String,String>();
			obj.put("loanLimit", userLoanInfo.getLoanLimit());
			obj.put("payDate", userLoanInfo.getPayDate());
			obj.put("makeLoansLimit",userLoanInfo.getMakeLoansLimit());
			obj.put("bankCard", userLoanInfo.getUserInfo().getBankCard());
			obj.put("status",userLoanInfo.getStatus());
		return obj;
	}	
	
	/**
	 *	平台 同意放款操作
	 * @param vo
	 * @return
	 */
	@RequestMapping("/api/agreeUserLoanInfo")
	public BaseResult agreeUserLoanInfo(@RequestBody UserLoanInfoVo vo) {
		
		userLoanInfoService.agreeUserLoanInfo(vo.getId(),vo.getMakeLoansLimit(),vo.getPayDate());
		
		BaseResult  result = new BaseResult();
		result.setCode("0");
		result.setReason("");
		result.setTime(System.currentTimeMillis());
		return result;
	}		
	
	/**
	 * 	平台拒绝放款	
	 * @param vo
	 * @return
	 */
	@RequestMapping("/api/loanDenied")
	public BaseResult loanDenied(@RequestBody UserLoanInfoVo vo) {
		
		userLoanInfoService.loanDenied(vo.getId());
		BaseResult  result = new BaseResult();
		result.setCode("0");
		result.setReason("");
		result.setTime(System.currentTimeMillis());
		return result;
	}		
	
	/**
	 * 	确认还款操作
	 * @param vo
	 * @return
	 */
	@RequestMapping("/api/confirmLoan")
	public BaseResult confirmLoan(@RequestBody UserLoanInfoVo vo) {
		
		userLoanInfoService.confirmLoan(vo.getId());
		
		BaseResult  result = new BaseResult();
		result.setCode("0");
		result.setReason("");
		result.setTime(System.currentTimeMillis());
		return result;
	}		
	
	/**
	 * 	更新用户贷款信息
	 * @param vo
	 * @return
	 */
	@RequestMapping("/api/userLoanInfo")
	public BaseResult updateUserLoanInfo(@RequestBody UserLoanInfoVo vo) {
		
		userLoanInfoService.updateUserLoanInfo(vo.getId(),vo.getLoanLimit(),vo.getMakeLoansLimit(),vo.getPayDate());
		
		BaseResult  result = new BaseResult();
		result.setCode("0");
		result.setReason("");
		result.setTime(System.currentTimeMillis());
		return result;
	}			

}
