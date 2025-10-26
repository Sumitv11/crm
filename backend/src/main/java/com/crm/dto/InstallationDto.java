package com.crm.dto;

import com.crm.entities.*;
import com.crm.enums.InstallationStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class InstallationDto {

    private Long id;

    private LocalDate installationDate;

    private Long installationReportNo;

    private Boolean isAgainstPo;

    private String poId;

    private Customer customer;

    private List<InstallationLocation> installationLocations;

    private List<InstallationProduct> installationProduct;

    private UserDetails installationDoneBy;

    private UserDetails installationVerifiedBy;

    private Boolean isExtraActivitiesCarriedOut;

    private InstallationStatus installationStatus;

    private String installationRemark;

    private List<InstallationAttachment> attachments;
}
