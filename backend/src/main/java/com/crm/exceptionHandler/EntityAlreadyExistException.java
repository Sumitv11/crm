package com.crm.exceptionHandler;


public class EntityAlreadyExistException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private final transient Object[] args;

	public EntityAlreadyExistException(String message, Object[] args) {
		super(message);
		this.args = args;
	}

	public Object[] getArgs() {
		return args;
	}

}
