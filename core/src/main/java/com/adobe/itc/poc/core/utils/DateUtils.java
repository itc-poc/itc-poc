package com.adobe.itc.poc.core.utils;

import com.adobe.cq.sightly.WCMUse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Calendar;

public class DateUtils extends WCMUse {

    private String formatedDate, monthName, day;
    private int year, date, month;

    @Override
    public void activate() throws Exception {

        String dateEntered = get("date", String.class);
        SimpleDateFormat monthDate = new SimpleDateFormat("MMMM dd, YYYY", Locale.ENGLISH);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yy");
        Date givenDate = simpleDateFormat.parse(dateEntered);

        month = givenDate.getMonth()+1;
        date = givenDate.getDate();
        Calendar calendar = Calendar.getInstance();
		calendar.setTime(givenDate);
		monthName = calendar.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.ENGLISH ) ;
		day = calendar.getDisplayName(Calendar.DAY_OF_WEEK, Calendar.LONG, Locale.ENGLISH );
     	year = givenDate.getYear() + 1900;
        formatedDate = monthDate.format(givenDate);

    }

    public String getFormatedDate() {
        return formatedDate;
    }
    public int getDate() {
        return date;
    }
    public String getDay() {
        return day;
    }
    public int getMonth() {
        return month;
    }
    public String getMonthName() {
        return monthName;
    }
    public int getYear() {
        return year;
    }

}


