package com.ums.project.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.entity.UserInfo;
import com.ums.project.entity.UserLoanInfo;
import com.ums.project.jsonMapping.common.Header;
import com.ums.project.result.ApplyLoanResult;
import com.ums.project.result.BaseResult;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.SystemMsgInfoService;
import com.ums.project.service.UserInfoService;
import com.ums.project.service.UserLoanInfoService;
import com.ums.project.util.DateUtil;

/**
 * desc：用户贷款信息接口
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
	
	private boolean tokenTimeOut(HttpServletRequest request, Header header) {
		Object tokenInfo = request.getSession().getAttribute(header.getToken());
		if(tokenInfo==null) {
			return false;
		}
		return true;
	}
	/**
	 *       申请还款
	 * @param applyLoanInfo
	 * @return
	 */
	@RequestMapping("/api/applyRepayment")
	public BaseResult applyRepayment(@RequestBody ApplyRepaymentRequestMapping requestData) {
		
		BaseResult result = new BaseResult();
		result.setTime(System.currentTimeMillis());
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 
		boolean tokenTimeOut = tokenTimeOut( request,requestData.getHeader());
		if(tokenTimeOut) {
			result.setCode("003");
			result.setReason("token过期");
			return result;
		}
		
		UserLoanInfo loanInfo = userLoanInfoService.getById(requestData.getBody().getLoanInfoId());
		SystemMsgInfo msg = new SystemMsgInfo();
		msg.setMsgContent("APP用户还款，请及时确认;申请人："+loanInfo.getUserInfo().getName()+" 手机号："+loanInfo.getUserInfo().getMobile());
		msg.setMsgTime(DateUtil.getDateFormat("yyyy-MM-dd HH:mm:ss", new Date()));
		msg.setMsgType("4");
		msg.setReadStatus("0");
		msg.setTipStatus("0");
		msg.setUserLoanInfo(loanInfo);		
		systemMsgInfoService.save(msg);
		
		result.setCode("0");
		result.setReason("");
		
		return result;
	}	

	/**
	 *       申请贷款第二步，输入验证
	 * @param applyLoanInfo
	 * @return
	 */
	@RequestMapping("/api/validMsg")
	public BaseResult validMsg(@RequestBody ValidMsgRequestData ValidMsgRequestData) {
		
		BaseResult result = new BaseResult();
		result.setTime(System.currentTimeMillis());
		
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 
		boolean tokenTimeOut = tokenTimeOut( request,ValidMsgRequestData.getHeader());
		if(tokenTimeOut) {
			result.setCode("003");
			result.setReason("token过期");
			return result;
		}
		
		ValidMsg validMsg = ValidMsgRequestData.getBody();
		UserLoanInfo loanInfo = userLoanInfoService.getById(validMsg.getLoanInfoId());
		//loanInfo.setId(validMsg.getLoanInfoId());
		SystemMsgInfo msg = new SystemMsgInfo();
		msg.setMsgContent("您有申请贷款的验证码需要处理，申请人："+loanInfo.getUserInfo().getName()+" 手机号："+loanInfo.getUserInfo().getMobile()+" 验证码："+validMsg.getCode());
		msg.setMsgTime(DateUtil.getDateFormat("yyyy-MM-dd HH:mm:ss", new Date()));
		msg.setMsgType("3");
		msg.setReadStatus("0");
		msg.setTipStatus("0");
		msg.setUserLoanInfo(loanInfo);		
		systemMsgInfoService.save(msg);
		
		result.setCode("0");
		result.setReason("");
		
		return result;
	}
	/**
	 *       用户申请贷款
	 * @param applyLoanInfo
	 * @return
	 */
	@RequestMapping("/api/userLoan/apply")
	public ApplyLoanResult applyLoan(@RequestBody AplayLoanRequestData AplayLoanRequestData) {
		
		ApplyLoanResult result = new ApplyLoanResult();
		result.setTime(System.currentTimeMillis());
		
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 
		boolean tokenTimeOut = tokenTimeOut( request,AplayLoanRequestData.getHeader());
		if(tokenTimeOut) {
			result.setCode("003");
			result.setReason("token过期");
			return result;
		}
		
		ApplyLoanInfo applyLoanInfo = AplayLoanRequestData.getBody();
		AppUserInfo appUserInfo = appUserInfoService.findByUserAccount(applyLoanInfo.getUserAccount());
		if(appUserInfo==null) {
			result.setCode("003");
			result.setReason("token过期");
		}else {
			UserLoanInfo loanInfo = userLoanInfoService.findRecentLoanInfo(applyLoanInfo.getUserAccount());
			if(loanInfo!=null) {
				result.setCode("1");
				result.setReason("存在未完成贷款，无法申请");
			}else {
				UserInfo userInfo = new UserInfo();
				UserLoanInfo userLoanInfo = new UserLoanInfo();
				userLoanInfo.setUserInfo(userInfo);
				
				userInfo.setAlipayAccount(applyLoanInfo.getAlipayAccount());
				userInfo.setBankCard(applyLoanInfo.getBankCard());
				userInfo.setBankCardImage(applyLoanInfo.getImages().getBankCardImage());
				userInfo.setHuaBei(applyLoanInfo.getHuaBei());
				userInfo.setHuaBeiImage(applyLoanInfo.getImages().getHuaBeiImage());
				userInfo.setIdCard(applyLoanInfo.getIdCard());
				userInfo.setIdCardHand(applyLoanInfo.getImages().getIdCardHand());
				userInfo.setIdCardOtherSize(applyLoanInfo.getImages().getIdCardOtherSize());
				userInfo.setIdCardPositive(applyLoanInfo.getImages().getIdCardPositive());
				userInfo.setMobile(applyLoanInfo.getUserAccount());
				userInfo.setMobileRealNameTime(applyLoanInfo.getMobileRealNameTime());
				userInfo.setMobileServicePassword(applyLoanInfo.getMobileServicePassword());
				userInfo.setName(applyLoanInfo.getName());
				userInfo.setUserAccount(applyLoanInfo.getUserAccount());
				userInfo.setZhiMaFen(applyLoanInfo.getZhiMaFen());
				userInfo.setZhiMaFenImage(applyLoanInfo.getImages().getZhiMaFenImage());
				userInfo.setAppUserInfo(appUserInfo);
				userLoanInfo.setAllInstalment("1");
				userLoanInfo.setApplyTime(DateUtil.getDateFormat("yyyy-MM-dd HH:mm:ss", new Date()));
				userLoanInfo.setLoanLimit("0");
				userLoanInfo.setMakeLoansLimit("0");
				userLoanInfo.setPayDate("");
				userLoanInfo.setStatus("0");
				userLoanInfo.setUserAccount(applyLoanInfo.getUserAccount());
				
				userInfoService.save(userInfo);
				userLoanInfoService.save(userLoanInfo);
				
				SystemMsgInfo msg = new SystemMsgInfo();
				msg.setMsgContent("您有一笔贷款申请需要处理，申请人："+userInfo.getName());
				msg.setMsgTime(DateUtil.getDateFormat("yyyy-MM-dd HH:mm:ss", new Date()));
				msg.setMsgType("1");
				msg.setReadStatus("0");
				msg.setTipStatus("0");
				msg.setUserLoanInfo(userLoanInfo);
				
				systemMsgInfoService.save(msg);
				
				result.setCode("0");
				result.setReason("");
				result.setLoanInfoId(userLoanInfo.getId());
			}			
		}

		return result;
		
	}
}

class ValidMsgRequestData{
	private Header header;
	
	private ValidMsg body;

	
	public ValidMsgRequestData() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ValidMsgRequestData(Header header, ValidMsg body) {
		super();
		this.header = header;
		this.body = body;
	}

	public Header getHeader() {
		return header;
	}

	public void setHeader(Header header) {
		this.header = header;
	}

	public ValidMsg getBody() {
		return body;
	}

	public void setBody(ValidMsg body) {
		this.body = body;
	}
	
	
}
class ValidMsg {
	private String loanInfoId;
	
	private String code;

	public String getLoanInfoId() {
		return loanInfoId;
	}

	public void setLoanInfoId(String loanInfoId) {
		this.loanInfoId = loanInfoId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}

class AplayLoanRequestData {
	private Header header;
	
	private ApplyLoanInfo body;

	
	public AplayLoanRequestData(Header header, ApplyLoanInfo body) {
		super();
		this.header = header;
		this.body = body;
	}

	public AplayLoanRequestData() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Header getHeader() {
		return header;
	}

	public void setHeader(Header header) {
		this.header = header;
	}

	public ApplyLoanInfo getBody() {
		return body;
	}

	public void setBody(ApplyLoanInfo body) {
		this.body = body;
	}
	
}
class ApplyLoanInfo {
	
	private String userAccount;
	
	private String name;
	
	private String idCard;
	
	private String mobileRealNameTime;
	
	private String  mobileServicePassword;
	
	private String  alipayAccount;
	
	private String  zhiMaFen;
	
	private String  huaBei;
	
	private String jieDaiBao;
	
	private String miFang;
	
	private String voucher;
	
	private String workUnitAddress;
	
	private String workUnitPhone;
	
	private List<Contact> emergencyContacts;
	
	private String bankCard;
	
	private Images images;

	
	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getMobileRealNameTime() {
		return mobileRealNameTime;
	}

	public void setMobileRealNameTime(String mobileRealNameTime) {
		this.mobileRealNameTime = mobileRealNameTime;
	}

	public String getMobileServicePassword() {
		return mobileServicePassword;
	}

	public void setMobileServicePassword(String mobileServicePassword) {
		this.mobileServicePassword = mobileServicePassword;
	}

	public String getAlipayAccount() {
		return alipayAccount;
	}

	public void setAlipayAccount(String alipayAccount) {
		this.alipayAccount = alipayAccount;
	}

	public String getZhiMaFen() {
		return zhiMaFen;
	}

	public void setZhiMaFen(String zhiMaFen) {
		this.zhiMaFen = zhiMaFen;
	}

	public String getHuaBei() {
		return huaBei;
	}

	public void setHuaBei(String huaBei) {
		this.huaBei = huaBei;
	}

	public String getJieDaiBao() {
		return jieDaiBao;
	}

	public void setJieDaiBao(String jieDaiBao) {
		this.jieDaiBao = jieDaiBao;
	}

	public String getMiFang() {
		return miFang;
	}

	public void setMiFang(String miFang) {
		this.miFang = miFang;
	}

	public String getVoucher() {
		return voucher;
	}

	public void setVoucher(String voucher) {
		this.voucher = voucher;
	}

	public String getWorkUnitAddress() {
		return workUnitAddress;
	}

	public void setWorkUnitAddress(String workUnitAddress) {
		this.workUnitAddress = workUnitAddress;
	}

	public String getWorkUnitPhone() {
		return workUnitPhone;
	}

	public void setWorkUnitPhone(String workUnitPhone) {
		this.workUnitPhone = workUnitPhone;
	}

	public List<Contact> getEmergencyContacts() {
		return emergencyContacts;
	}

	public void setEmergencyContacts(List<Contact> emergencyContacts) {
		this.emergencyContacts = emergencyContacts;
	}

	public String getBankCard() {
		return bankCard;
	}

	public void setBankCard(String bankCard) {
		this.bankCard = bankCard;
	}

	public Images getImages() {
		return images;
	}

	public void setImages(Images images) {
		this.images = images;
	}
	
	
}
class Contact {

	private String name;
	
	private String mobile;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	

}
class Images {
	private String zhiMaFenImage;
	
	private String idCardPositive;
	
	private String idCardOtherSize;
	
	private String idCardHand;
	
	private String bankCardImage;
					
	private String huaBeiImage;
	
	

	public String getHuaBeiImage() {
		return huaBeiImage;
	}

	public void setHuaBeiImage(String huaBeiImage) {
		this.huaBeiImage = huaBeiImage;
	}

	public String getZhiMaFenImage() {
		return zhiMaFenImage;
	}

	public void setZhiMaFenImage(String zhiMaFenImage) {
		this.zhiMaFenImage = zhiMaFenImage;
	}

	public String getIdCardPositive() {
		return idCardPositive;
	}

	public void setIdCardPositive(String idCardPositive) {
		this.idCardPositive = idCardPositive;
	}

	public String getIdCardOtherSize() {
		return idCardOtherSize;
	}

	public void setIdCardOtherSize(String idCardOtherSize) {
		this.idCardOtherSize = idCardOtherSize;
	}

	public String getIdCardHand() {
		return idCardHand;
	}

	public void setIdCardHand(String idCardHand) {
		this.idCardHand = idCardHand;
	}

	public String getBankCardImage() {
		return bankCardImage;
	}

	public void setBankCardImage(String bankCardImage) {
		this.bankCardImage = bankCardImage;
	}

}


class ApplyRepaymentRequestMapping{
	private Header header;
	
	private ApplyRepayment body;

	public ApplyRepaymentRequestMapping() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ApplyRepaymentRequestMapping(Header header, ApplyRepayment body) {
		super();
		this.header = header;
		this.body = body;
	}

	public Header getHeader() {
		return header;
	}

	public void setHeader(Header header) {
		this.header = header;
	}

	public ApplyRepayment getBody() {
		return body;
	}

	public void setBody(ApplyRepayment body) {
		this.body = body;
	}
	
	
}


class ApplyRepayment{
	
	private String loanInfoId;
	
	private String userAccount;

	public String getLoanInfoId() {
		return loanInfoId;
	}

	public void setLoanInfoId(String loanInfoId) {
		this.loanInfoId = loanInfoId;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public ApplyRepayment(String loanInfoId, String userAccount) {
		super();
		this.loanInfoId = loanInfoId;
		this.userAccount = userAccount;
	}

	public ApplyRepayment() {
		super();
	}
}