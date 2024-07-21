package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.entity.Basket;
import com.ecommerce.sportscenter.entity.BasketItem;
import com.ecommerce.sportscenter.model.BasketItemResponse;
import com.ecommerce.sportscenter.model.BasketResponse;
import com.ecommerce.sportscenter.service.BasketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/baskets")
public class BasketController {
    private final BasketService basketSerivce;

    public BasketController(BasketService basketSerivce) {
        this.basketSerivce = basketSerivce;
    }

    @GetMapping
    public List<BasketResponse> getAllBaskets() {
        return basketSerivce.getAllBaskets();
    }

    @GetMapping("/{basketId}")
    public BasketResponse getBasket(@PathVariable String basketId) {
        return basketSerivce.getBasketById(basketId);
    }

    @DeleteMapping("/{basketId}")
    public void deleteBasket(@PathVariable String basketId) {
        basketSerivce.deleteBasketById(basketId);
    }

    @PostMapping
    public ResponseEntity<BasketResponse> createBasket(@RequestBody BasketResponse basketResponse){
        Basket basket = convertToBasketEntity(basketResponse);

        BasketResponse createBasket = basketSerivce.createBasket(basket);

        return new ResponseEntity<>(createBasket, HttpStatus.CREATED);
    }

    private Basket convertToBasketEntity(BasketResponse basketResponse) {
        Basket basket = new Basket();
        basket.setId(basketResponse.getId());
        basket.setItems(mapBasketItemResponsesToEntities(basketResponse.getItems()));
        return basket;
    }

    private List<BasketItem> mapBasketItemResponsesToEntities(List<BasketItemResponse> items) {
        return items.stream().map(this::convertToBasketItemEntity).collect(Collectors.toList());
    }

    private BasketItem convertToBasketItemEntity(BasketItemResponse basketItemResponse) {
        BasketItem basketItem = new BasketItem();
        basketItem.setId(basketItemResponse.getId());
        basketItem.setName(basketItemResponse.getName());
        basketItem.setDescription(basketItemResponse.getDescription());
        basketItem.setPrice(basketItemResponse.getPrice());
        basketItem.setPictureUrl(basketItemResponse.getProductType());
        basketItem.setProductBrand(basketItemResponse.getProductBrand());
        basketItem.setProductType(basketItemResponse.getProductType());
        basketItem.setQuantity(basketItemResponse.getQuantity());

        return basketItem;

    }

}
