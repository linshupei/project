package com.ums.project.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	
	public static String getDateFormat(String format, Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}
}
