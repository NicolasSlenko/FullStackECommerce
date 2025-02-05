package com.ecommerce.sportscenter.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import java.util.List;
import java.util.ArrayList;


@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("Basket")
public class Basket {
    @Id
    private String id;
    private List<BasketItem> items = new ArrayList<>();

    public Basket(String id) {
        this.id = id;
    }
}
