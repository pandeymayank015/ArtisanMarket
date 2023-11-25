package com.example.artisian.services;

import com.example.artisian.entity.Product;
import com.example.artisian.entity.Wishlist;
import com.example.artisian.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    public void addToWishlist(Wishlist wishlistItem) {
        wishlistRepository.save(wishlistItem);
    }

    public void removeFromWishlist(String userId, Long productId) {
        Wishlist wishlistItem = wishlistRepository.findByUserIdAndProductId(userId, productId);
        if (wishlistItem != null) {
            wishlistRepository.delete(wishlistItem);
        }
    }

    public List<Long> getUserWishlist(String userId) {
        List<Wishlist> wishlistItems = wishlistRepository.findByUserId(userId);
        return wishlistItems.stream().map(Wishlist::getProductId).collect(Collectors.toList());
    }
}
