package com.example.artisian.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artisian.entity.Wishlist;
import com.example.artisian.services.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    // kova
    @PostMapping("/add")
    public ResponseEntity<String> addToWishlist(@RequestBody Wishlist wishlistItem) {
        wishlistService.addToWishlist(wishlistItem);
        return ResponseEntity.ok("Product added to wishlist");
    }

    @DeleteMapping("/remove/{userId}/{productId}")
    public ResponseEntity<String> removeFromWishlist(@PathVariable String userId, @PathVariable Long productId) {
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.ok("Product removed from wishlist");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Wishlist>> getUserWishlist(@PathVariable String userId) {
        List<Wishlist> wishlist = wishlistService.getWishlistByUserId(userId);
        return ResponseEntity.ok(wishlist);
    }

}
