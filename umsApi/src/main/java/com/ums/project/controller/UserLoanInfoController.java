package com.ums.project.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ums.project.entity.AppUserInfo;
import com.ums.project.entity.LiabilitiesPlatformInfo;
import com.ums.project.entity.SystemMsgInfo;
import com.ums.project.entity.UserEmergencyContact;
import com.ums.project.entity.UserInfo;
import com.ums.project.entity.UserLiabilitiesInfo;
import com.ums.project.entity.UserLoanInfo;
import com.ums.project.entity.UserWorkUnitInfo;
import com.ums.project.jsonMapping.common.Header;
import com.ums.project.memcaced.MemcachedConfiguration;
import com.ums.project.result.ApplyLoanResult;
import com.ums.project.result.ApplyRepaymentResult;
import com.ums.project.result.ApplyValidResult;
import com.ums.project.result.BaseResultApi;
import com.ums.project.result.ValidMsgResult;
import com.ums.project.service.AppUserInfoService;
import com.ums.project.service.SystemMsgInfoService;
import com.ums.project.service.UserEmergencyContactService;
import com.ums.project.service.UserInfoService;
import com.ums.project.service.UserLiabilitiesInfoService;
import com.ums.project.service.UserLoanInfoService;
import com.ums.project.service.UserWorkUnitInfoService;
import com.ums.project.service.LiabilitiesPlatformInfoService;
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
	
	@Resource(name="userWorkUnitInfoService")
	private UserWorkUnitInfoService userWorkUnitInfoService;
	
	@Resource(name="userEmergencyContactService")
	private UserEmergencyContactService userEmergencyContactService;

	@Resource(name="userLiabilitiesInfoService")
	private UserLiabilitiesInfoService  userLiabilitiesInfoService;
	
	@Resource(name="liabilitiesPlatformInfoService")
	private LiabilitiesPlatformInfoService liabilitiesPlatformInfoService;
	
	@Resource(name="memcachedConfiguration")
	private MemcachedConfiguration memcachedConfiguration;

	private static final Logger log = LoggerFactory.getLogger(UserLoanInfoController.class);	
	
	private boolean tokenTimeOut(HttpServletRequest request, Header header) {
		Object tokenInfo = memcachedConfiguration.get(header.getToken());
		//Object tokenInfo = request.getSession().getAttribute(header.getToken());
		if(tokenInfo==null) {
			return true;
		}
		return false;
	}
	

	/**
	 *       申请贷款权限验证
	 * @param applyLoanInfo
	 * @return
	 */
	@RequestMapping("/api/validApply")
	public BaseResultApi validApply(@RequestBody ValidApplyRequestData validApplyRequestData) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(validApplyRequestData);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}			
		
		ApplyValidResult result = new ApplyValidResult();
		result.setTime(System.currentTimeMillis());
		
		boolean tokenTimeOut = tokenTimeOut( request,validApplyRequestData.getHeader());
		if(tokenTimeOut) {
			result.setResult("003");
			result.setReason("token过期");
			return result;
		}
		ValidApply validApply = validApplyRequestData.getBody();
		
		UserLoanInfo loanInfo = userLoanInfoService.findRecentLoanInfo(validApply.getUserAccount());
		if(loanInfo!=null && !"-1".equals(loanInfo.getStatus()) && !"1".equals(loanInfo.getStatus()) && !"4".equals(loanInfo.getStatus())) {
			result.setCode("0");
			result.setReason("存在未完成贷款，无法申请");
		}		
		long num =userLoanInfoService.findDeniedApplayNum(validApply.getUserAccount());
		if(num>=3){
			result.setCode("0");
			result.setReason("被拒绝贷款次数超过3次，无法申请");
		}else{
			result.setCode("1");
			result.setReason("");			
		}
		return result;
	}
	
	/**
	 *  申请还款
	 * @param applyLoanInfo
	 * @return
	 */
	@RequestMapping("/api/applyRepayment")
	public ApplyRepaymentResult applyRepayment(@RequestBody ApplyRepaymentRequestMapping requestData) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(requestData);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}	
		
		ApplyRepaymentResult result = new ApplyRepaymentResult();
		result.setTime(System.currentTimeMillis());
		boolean tokenTimeOut = tokenTimeOut( request,requestData.getHeader());
		if(tokenTimeOut) {
			result.setResult("003");
			result.setReason("token过期");
			return result;
		}
		
		UserLoanInfo loanInfo = userLoanInfoService.getById(requestData.getBody().getLoanInfoId());
		userLoanInfoService.updateStatus(loanInfo.getId(),"5");
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
	public ValidMsgResult validMsg(@RequestBody ValidMsgRequestData ValidMsgRequestData) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(ValidMsgRequestData);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		ValidMsgResult result = new ValidMsgResult();
		result.setTime(System.currentTimeMillis());
		
		boolean tokenTimeOut = tokenTimeOut( request,ValidMsgRequestData.getHeader());
		if(tokenTimeOut) {
			result.setResult("003");
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
	 *       用户信息填写
	 * @param applyLoanInfo
	 * @return
	 */
	@RequestMapping("/api/userLoan/info")
	public ApplyLoanResult inputApplyLoanInfo(@RequestBody AplayLoanRequestData AplayLoanRequestData) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(AplayLoanRequestData);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		ApplyLoanResult result = new ApplyLoanResult();
		result.setTime(System.currentTimeMillis());
		
		boolean tokenTimeOut = tokenTimeOut( request,AplayLoanRequestData.getHeader());
		if(tokenTimeOut) {
			result.setResult("003");
			result.setReason("token过期");
			return result;
		}
		
		ApplyLoanInfo applyLoanInfo = AplayLoanRequestData.getBody();
		AppUserInfo appUserInfo = appUserInfoService.findByUserAccount(applyLoanInfo.getUserAccount());
		if(appUserInfo==null) {
			result.setResult("003");
			result.setReason("token过期");
		}else {
			//UserLoanInfo loanInfo = userLoanInfoService.findRecentLoanInfo(applyLoanInfo.getUserAccount());

			if(!StringUtils.isEmpty(applyLoanInfo.getApplyId())){
				//首次填写信息
				UserLoanInfo userLoanInfo = userLoanInfoService.findById(applyLoanInfo.getApplyId());
				if(userLoanInfo==null ||!"-1".equals(userLoanInfo.getStatus())){
					//新增操作
					result =addApplyInfo(AplayLoanRequestData, appUserInfo);
				}else{
					//删除旧的
					if(userLoanInfo.getUserInfo().getName().equals(applyLoanInfo.getName())){
						//删除旧信息
						deleteOutDateApplyInfo(userLoanInfo);
						//更新操作
						result =updateApplyInfo(AplayLoanRequestData, appUserInfo,userLoanInfo.getUserInfo(),userLoanInfo);						
					}else{
						//新增操作
						result =addApplyInfo(AplayLoanRequestData, appUserInfo);
					}
				}
			}else{
				//新增信息操作
				result =addApplyInfo(AplayLoanRequestData, appUserInfo);
			}
					
/*			if(loanInfo!=null && !"1".equals(loanInfo.getStatus()) && !"4".equals(loanInfo.getStatus())) {
				result.setCode("1");
				result.setReason("存在未完成贷款，无法申请");
			}else {}	*/		
		}

		return result;
		
	}	
	
	private void deleteOutDateApplyInfo(UserLoanInfo userLoanInfo) {
		// userInfoService.removeById(userLoanInfo.getUserInfo().getId());
		// userLoanInfoService.deleteByUserInfo(userLoanInfo.getUserInfo().getId());
		 userEmergencyContactService.deleteByUserInfo(userLoanInfo.getUserInfo().getId());
		 userLiabilitiesInfoService.deleteByUserInfo(userLoanInfo.getUserInfo().getId());
		 userWorkUnitInfoService.deleteByUserInfo(userLoanInfo.getUserInfo().getId());
		 //systemMsgInfoService.deleteByUserLoanInfoId(userLoanInfo.getId());
	}

	private ApplyLoanResult  updateApplyInfo(AplayLoanRequestData AplayLoanRequestData,AppUserInfo appUserInfo,UserInfo userInfo,UserLoanInfo userLoanInfo) {
		ApplyLoanResult result = new ApplyLoanResult();
		result.setTime(System.currentTimeMillis());
		
		ApplyLoanInfo applyLoanInfo = AplayLoanRequestData.getBody();

		
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
		userLoanInfo.setStatus("-1");
		userLoanInfo.setUserAccount(applyLoanInfo.getUserAccount());
		
		userInfoService.save(userInfo);
		userLoanInfoService.save(userLoanInfo);
		
		result.setCode("0");
		result.setReason("");
		result.setLoanInfoId(userLoanInfo.getId());
		
		List<Contact> emergencyContacts = AplayLoanRequestData.getBody().getEmergencyContacts();
		List<UserEmergencyContact> saveContacts = new ArrayList<UserEmergencyContact>();
		for(Contact contact:emergencyContacts){
			UserEmergencyContact ec = new UserEmergencyContact();
			ec.setMobile(contact.getMobile());
			ec.setName(contact.getName());
			ec.setUserAccount(userInfo.getUserAccount());
			ec.setUserInfo(userInfo);
			saveContacts.add(ec);
			userEmergencyContactService.save(saveContacts);
		}
		
		
		String miFang = AplayLoanRequestData.getBody().getMiFang();
		String jieDaiBao = AplayLoanRequestData.getBody().getJieDaiBao();
		String voucher = AplayLoanRequestData.getBody().getVoucher();
		List<LiabilitiesPlatformInfo> findAll = liabilitiesPlatformInfoService.findAll();
		List<UserLiabilitiesInfo> savePData = new ArrayList<UserLiabilitiesInfo>();
		for(LiabilitiesPlatformInfo pl:findAll){
			UserLiabilitiesInfo uil = new UserLiabilitiesInfo();
			uil.setUserAccount(userInfo.getUserAccount());
			uil.setUserInfo(userInfo);
			if("miFang".equals(pl.getLiabilitiesPlatform())){
				uil.setLiabilitiesAmount(miFang);
				uil.setLiabilitiesPlatformInfo(pl);					
			}
			if("jieDaiBao".equals(pl.getLiabilitiesPlatform())){
				uil.setLiabilitiesAmount(jieDaiBao);
				uil.setLiabilitiesPlatformInfo(pl);					
			}
			if("voucher".equals(pl.getLiabilitiesPlatform())){
				uil.setLiabilitiesAmount(voucher);
				uil.setLiabilitiesPlatformInfo(pl);					
			}				
			savePData.add(uil);
		}
		userLiabilitiesInfoService.saveAll(savePData);

		UserWorkUnitInfo workInfo = new UserWorkUnitInfo();
		String workUnitAddress = AplayLoanRequestData.getBody().getWorkUnitAddress();
		String workUnitPhone = AplayLoanRequestData.getBody().getWorkUnitPhone();
		
		workInfo.setUserAccount(userInfo.getUserAccount());
		workInfo.setUserInfo(userInfo);
		workInfo.setWorkUnitAddress(workUnitAddress);
		workInfo.setWorkUnitPhone(workUnitPhone);
		userWorkUnitInfoService.save(workInfo);

		return result;
	}

	private ApplyLoanResult  addApplyInfo(AplayLoanRequestData AplayLoanRequestData,AppUserInfo appUserInfo) {
		ApplyLoanResult result = new ApplyLoanResult();
		result.setTime(System.currentTimeMillis());
		
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 
		ApplyLoanInfo applyLoanInfo = AplayLoanRequestData.getBody();

		
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
		userLoanInfo.setStatus("-1");
		userLoanInfo.setUserAccount(applyLoanInfo.getUserAccount());
		
		userInfoService.save(userInfo);
		userLoanInfoService.save(userLoanInfo);
		
		result.setCode("0");
		result.setReason("");
		result.setLoanInfoId(userLoanInfo.getId());
		
		List<Contact> emergencyContacts = AplayLoanRequestData.getBody().getEmergencyContacts();
		List<UserEmergencyContact> saveContacts = new ArrayList<UserEmergencyContact>();
		for(Contact contact:emergencyContacts){
			UserEmergencyContact ec = new UserEmergencyContact();
			ec.setMobile(contact.getMobile());
			ec.setName(contact.getName());
			ec.setUserAccount(userInfo.getUserAccount());
			ec.setUserInfo(userInfo);
			saveContacts.add(ec);
			userEmergencyContactService.save(saveContacts);
		}
		
		
		String miFang = AplayLoanRequestData.getBody().getMiFang();
		String jieDaiBao = AplayLoanRequestData.getBody().getJieDaiBao();
		String voucher = AplayLoanRequestData.getBody().getVoucher();
		List<LiabilitiesPlatformInfo> findAll = liabilitiesPlatformInfoService.findAll();
		List<UserLiabilitiesInfo> savePData = new ArrayList<UserLiabilitiesInfo>();
		for(LiabilitiesPlatformInfo pl:findAll){
			UserLiabilitiesInfo uil = new UserLiabilitiesInfo();
			uil.setUserAccount(userInfo.getUserAccount());
			uil.setUserInfo(userInfo);
			if("miFang".equals(pl.getLiabilitiesPlatform())){
				uil.setLiabilitiesAmount(miFang);
				uil.setLiabilitiesPlatformInfo(pl);					
			}
			if("jieDaiBao".equals(pl.getLiabilitiesPlatform())){
				uil.setLiabilitiesAmount(jieDaiBao);
				uil.setLiabilitiesPlatformInfo(pl);					
			}
			if("voucher".equals(pl.getLiabilitiesPlatform())){
				uil.setLiabilitiesAmount(voucher);
				uil.setLiabilitiesPlatformInfo(pl);					
			}				
			savePData.add(uil);
		}
		userLiabilitiesInfoService.saveAll(savePData);

		UserWorkUnitInfo workInfo = new UserWorkUnitInfo();
		String workUnitAddress = AplayLoanRequestData.getBody().getWorkUnitAddress();
		String workUnitPhone = AplayLoanRequestData.getBody().getWorkUnitPhone();
		
		workInfo.setUserAccount(userInfo.getUserAccount());
		workInfo.setUserInfo(userInfo);
		workInfo.setWorkUnitAddress(workUnitAddress);
		workInfo.setWorkUnitPhone(workUnitPhone);
		userWorkUnitInfoService.save(workInfo);

		return result;
	}


	/**
	 *       用户申请贷款 2.0版本
	 * @param applyLoanInfo
	 * @return
	 */
	@RequestMapping("/api/userLoan/applyConfirm")
	public ApplyLoanResult applyConfirm(@RequestBody AplayLoanRequestData AplayLoanRequestData) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(AplayLoanRequestData);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		ApplyLoanResult result = new ApplyLoanResult();
		result.setTime(System.currentTimeMillis());
		result.setCode("0");
		boolean tokenTimeOut = tokenTimeOut( request,AplayLoanRequestData.getHeader());
		if(tokenTimeOut) {
			result.setResult("003");
			result.setReason("token过期");
			return result;
		}
		
		ApplyLoanInfo applyLoanInfo = AplayLoanRequestData.getBody();
		AppUserInfo appUserInfo = appUserInfoService.findByUserAccount(applyLoanInfo.getUserAccount());
		if(appUserInfo==null) {
			result.setResult("003");
			result.setReason("token过期");
		}else {
/*			UserLoanInfo loanInfo = userLoanInfoService.findRecentLoanInfo(applyLoanInfo.getUserAccount());
			if(loanInfo!=null && !"1".equals(loanInfo.getStatus()) && !"4".equals(loanInfo.getStatus())) {
				result.setCode("1");
				result.setReason("存在未完成贷款，无法申请");
			}else {
				if("-1".equals(loanInfo.getStatus())){
					userLoanInfoService.updateStatus(loanInfo.getId(), "0");
					if("".equals(appUserInfo.getLoanNum())){
						appUserInfo.setLoanNum("1");
					}else{
						appUserInfo.setLoanNum((Integer.parseInt(appUserInfo.getLoanNum())+1)+"");
					}
					appUserInfoService.updateLoanNum(appUserInfo.getId(),appUserInfo.getLoanNum());					
				}
			}*/			
			UserLoanInfo loanInfo = userLoanInfoService.getById(applyLoanInfo.getApplyId());
			if("-1".equals(loanInfo.getStatus())){
				result.setLoanInfoId(loanInfo.getId());
				userLoanInfoService.updateStatus(loanInfo.getId(), "0");
				if("".equals(appUserInfo.getLoanNum())){
					appUserInfo.setLoanNum("1");
				}else{
					appUserInfo.setLoanNum((Integer.parseInt(appUserInfo.getLoanNum())+1)+"");
				}
				appUserInfoService.updateLoanNum(appUserInfo.getId(),appUserInfo.getLoanNum());		
				SystemMsgInfo msg = new SystemMsgInfo();
				msg.setMsgContent("您有一笔贷款申请需要处理，申请人："+loanInfo.getUserInfo().getName());
				msg.setMsgTime(DateUtil.getDateFormat("yyyy-MM-dd HH:mm:ss", new Date()));
				msg.setMsgType("1");
				msg.setReadStatus("0");
				msg.setTipStatus("0");
				msg.setUserLoanInfo(loanInfo);
				
				systemMsgInfoService.save(msg);				
			}
					
		}
		return result;
	}
	
	/**
	 *       用户申请贷款 1.0版本
	 * @param applyLoanInfo
	 * @return
	 */
	@RequestMapping("/api/userLoan/apply")
	public ApplyLoanResult applyLoan(@RequestBody AplayLoanRequestData AplayLoanRequestData) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest(); 		
		try {
			String url = request.getRequestURL().toString();
			 ObjectMapper mapper = new ObjectMapper();
			 String json = mapper.writeValueAsString(AplayLoanRequestData);
			log.info(url+" "+json);				
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}		
		ApplyLoanResult result = new ApplyLoanResult();
		result.setTime(System.currentTimeMillis());
		
		boolean tokenTimeOut = tokenTimeOut( request,AplayLoanRequestData.getHeader());
		if(tokenTimeOut) {
			result.setResult("003");
			result.setReason("token过期");
			return result;
		}
		
		ApplyLoanInfo applyLoanInfo = AplayLoanRequestData.getBody();
		AppUserInfo appUserInfo = appUserInfoService.findByUserAccount(applyLoanInfo.getUserAccount());
		if(appUserInfo==null) {
			result.setResult("003");
			result.setReason("token过期");
		}else {
			UserLoanInfo loanInfo = userLoanInfoService.findRecentLoanInfo(applyLoanInfo.getUserAccount());
			if(loanInfo!=null && !"1".equals(loanInfo.getStatus()) && !"4".equals(loanInfo.getStatus())) {
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
				
				List<Contact> emergencyContacts = AplayLoanRequestData.getBody().getEmergencyContacts();
				List<UserEmergencyContact> saveContacts = new ArrayList<UserEmergencyContact>();
				for(Contact contact:emergencyContacts){
					UserEmergencyContact ec = new UserEmergencyContact();
					ec.setMobile(contact.getMobile());
					ec.setName(contact.getName());
					ec.setUserAccount(userInfo.getUserAccount());
					ec.setUserInfo(userInfo);
					saveContacts.add(ec);
					userEmergencyContactService.save(saveContacts);
				}
				
				
				String miFang = AplayLoanRequestData.getBody().getMiFang();
				String jieDaiBao = AplayLoanRequestData.getBody().getJieDaiBao();
				String voucher = AplayLoanRequestData.getBody().getVoucher();
				List<LiabilitiesPlatformInfo> findAll = liabilitiesPlatformInfoService.findAll();
				List<UserLiabilitiesInfo> savePData = new ArrayList<UserLiabilitiesInfo>();
				for(LiabilitiesPlatformInfo pl:findAll){
					UserLiabilitiesInfo uil = new UserLiabilitiesInfo();
					uil.setUserAccount(userInfo.getUserAccount());
					uil.setUserInfo(userInfo);
					if("miFang".equals(pl.getLiabilitiesPlatform())){
						uil.setLiabilitiesAmount(miFang);
						uil.setLiabilitiesPlatformInfo(pl);					
					}
					if("jieDaiBao".equals(pl.getLiabilitiesPlatform())){
						uil.setLiabilitiesAmount(jieDaiBao);
						uil.setLiabilitiesPlatformInfo(pl);					
					}
					if("voucher".equals(pl.getLiabilitiesPlatform())){
						uil.setLiabilitiesAmount(voucher);
						uil.setLiabilitiesPlatformInfo(pl);					
					}				
					savePData.add(uil);
				}
				userLiabilitiesInfoService.saveAll(savePData);

				UserWorkUnitInfo workInfo = new UserWorkUnitInfo();
				String workUnitAddress = AplayLoanRequestData.getBody().getWorkUnitAddress();
				String workUnitPhone = AplayLoanRequestData.getBody().getWorkUnitPhone();
				
				workInfo.setUserAccount(userInfo.getUserAccount());
				workInfo.setUserInfo(userInfo);
				workInfo.setWorkUnitAddress(workUnitAddress);
				workInfo.setWorkUnitPhone(workUnitPhone);
				userWorkUnitInfoService.save(workInfo);
				
				if("".equals(appUserInfo.getLoanNum())){
					appUserInfo.setLoanNum("1");
				}else{
					appUserInfo.setLoanNum((Integer.parseInt(appUserInfo.getLoanNum())+1)+"");
				}
				appUserInfoService.updateLoanNum(appUserInfo.getId(),appUserInfo.getLoanNum());
				
			}			
		}
		return result;
	}
}

class ValidApplyRequestData{
	private Header header;
	
	private ValidApply body;

	
	public ValidApplyRequestData() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ValidApplyRequestData(Header header, ValidApply body) {
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

	public ValidApply getBody() {
		return body;
	}

	public void setBody(ValidApply body) {
		this.body = body;
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


class ValidApply {
	private String userAccount;

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
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
	
	private String applyId;
	
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

	
	public String getApplyId() {
		return applyId;
	}

	public void setApplyId(String applyId) {
		this.applyId = applyId;
	}

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