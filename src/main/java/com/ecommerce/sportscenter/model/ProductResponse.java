package com.ecommerce.sportscenter.model;

import com.ecommerce.sportscenter.entity.Brand;
import com.ecommerce.sportscenter.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;
    private String description;
    private Long price;
    private String pictureURL;
    private String productBrand;
    private String productType;
}
