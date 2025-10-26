package com.crm.dto;

import java.util.List;

public class Status {

	private int code;
	private String message;
	private String resmessage;
	private List<Object> datas;
	 private Object data;

	public Status() {
	}

	public Status(String message) {
		
		this.message = message;
	}



	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<Object> getDatas(List<Object> existingChecklist) {
		return datas;
	}

	public void setDatas(List<Object> datas) {
		this.datas = datas;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public List<Object> getDatas() {
		return datas;
	}

	public String getResmessage() {
		return resmessage;
	}

	public void setResmessage(String resmessage) {
		this.resmessage = resmessage;
	}

	
	
}
