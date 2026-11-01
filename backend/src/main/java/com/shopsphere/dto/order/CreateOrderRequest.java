package com.shopsphere.dto.order;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {

    @NotBlank(message = "Recipient full name is required")
    private String shippingName;

    @NotBlank(message = "Contact phone number is required")
    private String shippingPhone;

    @NotBlank(message = "Street address is required")
    private String shippingAddress;

    @NotBlank(message = "City is required")
    private String shippingCity;

    @NotBlank(message = "State is required")
    private String shippingState;

    @NotBlank(message = "Postal code is required")
    private String shippingPostalCode;

    @Builder.Default
    private String paymentMethod = "CASH_ON_DELIVERY";
}
