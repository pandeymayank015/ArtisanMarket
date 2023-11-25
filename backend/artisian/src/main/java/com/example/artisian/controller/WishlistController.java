package com.example.artisian.controller;
import com.example.artisian.entity.AdminApproval;
import com.example.artisian.entity.Product;
import com.example.artisian.entity.Wishlist;
import com.example.artisian.services.AdminApprovalService;
import com.example.artisian.services.ProductService;
import com.example.artisian.services.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;
//kova
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
