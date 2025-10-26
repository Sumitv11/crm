package com.crm.util;

public class Util {

    public static String getFileExtension(String fileName) {
        int index = fileName.lastIndexOf('.');
        return index != -1 ? fileName.substring(index + 1) : "";
    }

}
