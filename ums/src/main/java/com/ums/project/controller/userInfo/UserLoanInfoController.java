package com.ums.project.controller.userInfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.data.domain.Page;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ums.project.entity.UserEmergencyContact;
import com.ums.project.entity.UserLiabilitiesInfo;
import com.ums.project.entity.UserLoanInfo;
import com.ums.project.queryBean.UserInfoQueryBean;
import com.ums.project.queryBean.UserLoanInfoQueryBean;
import com.ums.project.result.BaseResult;
import com.ums.project.result.DataPage;
import com.ums.project.result.TableData;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.LiabilitiesPlatformInfoService;
import com.ums.project.service.SystemMsgInfoService;
import com.ums.project.service.UserEmergencyContactService;
import com.ums.project.service.UserInfoService;
import com.ums.project.service.UserLiabilitiesInfoService;
import com.ums.project.service.UserLoanInfoService;
import com.ums.project.service.UserWorkUnitInfoService;
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
	
	@Resource(name="userInfoService")
	private UserInfoService userInfoService;
	
	@Resource(name="systemMsgInfoService")
	private SystemMsgInfoService systemMsgInfoService;
	
	@Resource(name="appUserInfoService")
	private AppUserInfoService appUserInfoService;
	
	@Resource(name="userWorkUnitInfoService")
	private UserWorkUnitInfoService userWorkUnitInfoService;
	
	@Resource(name="userEmergencyContactService")
	private UserEmergencyContactService userEmergencyContactService;

	@Resource(name="userLiabilitiesInfoService")
	private UserLiabilitiesInfoService  userLiabilitiesInfoService;
	
	@Resource(name="liabilitiesPlatformInfoService")
	private LiabilitiesPlatformInfoService liabilitiesPlatformInfoService;
	
	@RequestMapping("/api/deleteUserLoanInfo")
	public BaseResult deleteUserInfo(@RequestBody UserInfoQueryBean bean){
		
		BaseResult result = new BaseResult();
		result.setCode("0");
		result.setTime(System.currentTimeMillis());
		result.setReason("ok");
		UserLoanInfo userLoanInfo= userLoanInfoService.getById(bean.getId());
/*		if(!"-1".equals(userLoanInfo.getStatus())
				&&!"1".equals(userLoanInfo.getStatus())
				&&!"4".equals(userLoanInfo.getStatus())){//存在未完成贷款
			result.setCode("1");
			result.setReason("存在未完成贷款信息，无法删除。");
		}else{*/
			userInfoService.removeById(userLoanInfo.getUserInfo().getId());
			userLoanInfoService.deleteByUserInfo(userLoanInfo.getUserInfo().getId());
			userWorkUnitInfoService.deleteByUserInfo(userLoanInfo.getUserInfo().getId());
			userEmergencyContactService.deleteByUserInfo(userLoanInfo.getUserInfo().getId());
			userLiabilitiesInfoService.deleteByUserInfo(userLoanInfo.getUserInfo().getId());
			systemMsgInfoService.deleteByUserLoanInfoId(userLoanInfo.getId());
		//}
		return result;
	}
	
	
	/**
	 * 	申请客户资料分页查询
	 * @param userInfoId
	 * @param keyword
	 * @param page
	 * @param limit
	 * @return
	 */
	@RequestMapping("/api/userLoanInfosPart")
	public TableData userLoanInfosPartPageData(@RequestParam(required=false) String userInfoId,@RequestParam(required=false) String keyword,@RequestParam(required=false) String status,@RequestParam int page,@RequestParam int limit) {
		
		UserLoanInfoQueryBean queryBean = new UserLoanInfoQueryBean();
		DataPage datapage = new DataPage();
		queryBean.setKey(keyword);
		queryBean.setUserInfoId(userInfoId);
		queryBean.setLoanStatus(status);
		datapage.setLimit(limit);
		datapage.setPage(page);
		
		List<UserLoanInfoVo> userInfos = new ArrayList<UserLoanInfoVo>();
		Page<UserLoanInfo> userInfoPageData = userLoanInfoService.userInfoPageDataPart(queryBean, datapage);
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
			vo.setMark(info.getMark());
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
	@RequestMapping("/api/query/userLoanInfoPart")
	public Map<String,Object> userLoanInfoPart(@RequestParam String id) {
		String miFang = "";
		String jieDaiBao = "";
		String voucher="";
		UserLoanInfo userLoanInfo = userLoanInfoService.findById(id);
		List<UserLiabilitiesInfo> userLiabilitiesInfo = userLoanInfo.getUserInfo().getUserLiabilitiesInfo();
		List<UserEmergencyContact> userEmergencyContact = userLoanInfo.getUserInfo().getUserEmergencyContact();
		Map<String,String> userEmergencyContactMap = new HashMap<String,String>();
		Map<String,Object> obj = new HashMap<String,Object>();
		Map<String,String> idCardImage = new HashMap<String,String>();
		
		for(UserLiabilitiesInfo uli:userLiabilitiesInfo){
			if("miFang".equals(uli.getLiabilitiesPlatformInfo().getLiabilitiesPlatform())){
				miFang = uli.getLiabilitiesAmount();
			}else if("jieDaiBao".equals(uli.getLiabilitiesPlatformInfo().getLiabilitiesPlatform())){
				jieDaiBao = uli.getLiabilitiesAmount();
			}else if("voucher".equals(uli.getLiabilitiesPlatformInfo().getLiabilitiesPlatform())){
				voucher = uli.getLiabilitiesAmount();
			}
		}
		for(int inx=0;inx<userEmergencyContact.size();inx++){
			UserEmergencyContact uec = userEmergencyContact.get(inx);
			userEmergencyContactMap.put("userEmergencyContact"+(inx+1),"（"+uec.getName()+"）："+uec.getMobile());
		}
		
		idCardImage.put("idCardPositive", userLoanInfo.getUserInfo().getIdCardPositive());
		idCardImage.put("idCardOtherSize", userLoanInfo.getUserInfo().getIdCardOtherSize());
		idCardImage.put("idCardHand", userLoanInfo.getUserInfo().getIdCardHand());
			
			obj.put("userAccount", userLoanInfo.getUserInfo().getUserAccount());
			obj.put("mobileRealNameTime", userLoanInfo.getUserInfo().getMobileRealNameTime());
			obj.put("mobileServicePassword", userLoanInfo.getUserInfo().getMobileServicePassword());
			obj.put("alipayAccount", userLoanInfo.getUserInfo().getAlipayAccount());
			obj.put("mobile", userLoanInfo.getUserInfo().getMobile());
			obj.put("zhiMaFen", userLoanInfo.getUserInfo().getZhiMaFen());
			obj.put("huaBei", userLoanInfo.getUserInfo().getHuaBei());
			obj.put("workUnitPhone", userLoanInfo.getUserInfo().getUserWorkUnitInfo()!=null?userLoanInfo.getUserInfo().getUserWorkUnitInfo().getWorkUnitPhone():"");
			obj.put("miFang", miFang);
			obj.put("idCardImage", idCardImage);
			obj.put("applyTime", userLoanInfo.getApplyTime());
			obj.put("workUnitAddress", userLoanInfo.getUserInfo().getUserWorkUnitInfo()!=null?userLoanInfo.getUserInfo().getUserWorkUnitInfo().getWorkUnitAddress():"");
			obj.put("jieDaiBao", jieDaiBao);
			obj.put("userEmergencyContact", userEmergencyContactMap);
			obj.put("voucher", voucher);
			
			obj.put("loanLimit", userLoanInfo.getLoanLimit());
			obj.put("payDate", userLoanInfo.getPayDate());
			obj.put("makeLoansLimit",userLoanInfo.getMakeLoansLimit());
			obj.put("bankCardImage", userLoanInfo.getUserInfo().getBankCardImage());
			obj.put("bankCard", userLoanInfo.getUserInfo().getBankCard());
			obj.put("status",userLoanInfo.getStatus());
			obj.put("mark",userLoanInfo.getMark());
		return obj;
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
		
		userLoanInfoService.agreeUserLoanInfo(vo.getId(),vo.getLoanLimit(),vo.getMakeLoansLimit(),vo.getPayDate());
		
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
		
		userLoanInfoService.loanDenied(vo.getId(),vo.getMark());
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

	
	/**
	 * 	延长还款日期
	 * @param vo
	 * @return
	 */
	@RequestMapping("/api/updatePayDate")
	public BaseResult updatePayDate(@RequestBody UserLoanInfoVo vo) {
		UserLoanInfo userLoanInfo = userLoanInfoService.getById(vo.getId());
		userLoanInfoService.updateUserLoanInfo(vo.getId(),userLoanInfo.getLoanLimit(),userLoanInfo.getMakeLoansLimit(),vo.getPayDate());
		
		BaseResult  result = new BaseResult();
		result.setCode("0");
		result.setReason("");
		result.setTime(System.currentTimeMillis());
		return result;
	}		
}
