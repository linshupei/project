package com.ums.project.util;

import org.springframework.util.DigestUtils;

public class MD5Util {

	public static String getMD5(String data) {
		return DigestUtils.md5DigestAsHex(data.getBytes()).toUpperCase();
	}
}
