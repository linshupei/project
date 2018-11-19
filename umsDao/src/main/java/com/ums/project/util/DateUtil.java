package com.ums.project.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	
	public static String getDateFormat(String format, Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}
	
	public static Long parseDate(String format, String value) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		try {
			return sdf.parse(value).getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0L;
	}
}
