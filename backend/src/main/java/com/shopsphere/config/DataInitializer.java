package com.shopsphere.config;

import com.shopsphere.entity.*;
import com.shopsphere.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@shopsphere.com}")
    private String adminEmail;

    @Value("${app.admin.password:Admin@123}")
    private String adminPassword;

    @Value("${app.admin.name:ShopSphere Administrator}")
    private String adminName;

    @Value("${app.demo.email:customer@shopsphere.com}")
    private String demoEmail;

    @Value("${app.demo.password:Customer@123}")
    private String demoPassword;

    @Value("${app.demo.name:Demo Customer}")
    private String demoName;

    @Override
    public void run(String... args) {
        initAdminAccount();
        initDemoCustomer();
        initCatalogIfEmpty();
    }

    private void initAdminAccount() {
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = User.builder()
                    .name(adminName)
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .role(Role.ROLE_ADMIN)
                    .phone("+1 800-555-0199")
                    .address("Executive Suite 100, Tech Park")
                    .city("San Francisco")
                    .state("CA")
                    .postalCode("94105")
                    .build();

            User saved = userRepository.save(admin);
            log.info("Initialized default Administrator account: {}", adminEmail);

            Cart cart = Cart.builder().user(saved).build();
            cartRepository.save(cart);
        }
    }

    private void initDemoCustomer() {
        if (!userRepository.existsByEmail(demoEmail)) {
            User demo = User.builder()
                    .name(demoName)
                    .email(demoEmail)
                    .password(passwordEncoder.encode(demoPassword))
                    .role(Role.ROLE_CUSTOMER)
                    .phone("+1 555-0144")
                    .address("456 Blossom Lane")
                    .city("Austin")
                    .state("TX")
                    .postalCode("78701")
                    .build();

            User saved = userRepository.save(demo);
            log.info("Initialized default Customer demo account: {}", demoEmail);

            Cart cart = Cart.builder().user(saved).build();
            cartRepository.save(cart);
        }
    }

    private void initCatalogIfEmpty() {
        if (categoryRepository.count() == 0) {
            log.info("Seeding initial categories and products...");

            Category electronics = categoryRepository.save(Category.builder()
                    .name("Electronics")
                    .description("Smartphones, laptops, headphones, smart devices, and accessories")
                    .imageUrl("https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80")
                    .build());

            Category fashion = categoryRepository.save(Category.builder()
                    .name("Fashion & Apparel")
                    .description("Trendy clothing, luxury footwear, accessories, and designer wear")
                    .imageUrl("https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80")
                    .build());

            Category home = categoryRepository.save(Category.builder()
                    .name("Home & Kitchen")
                    .description("Modern cookware, aesthetic home decor, furniture, and smart appliances")
                    .imageUrl("https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80")
                    .build());

            Category sports = categoryRepository.save(Category.builder()
                    .name("Sports & Fitness")
                    .description("High-performance athletic gear, fitness equipment, and sportswear")
                    .imageUrl("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80")
                    .build());

            Category books = categoryRepository.save(Category.builder()
                    .name("Books & Stationery")
                    .description("Bestsellers, academic books, premium journals, and artistic stationery")
                    .imageUrl("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80")
                    .build());

            Category beauty = categoryRepository.save(Category.builder()
                    .name("Beauty & Wellness")
                    .description("Skincare, organic personal care, perfumes, and health wellness essentials")
                    .imageUrl("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80")
                    .build());

            List<Product> products = new ArrayList<>();

            products.add(Product.builder()
                    .name("AuraSound Pro Wireless Headphones")
                    .description("Active noise cancelling, 40-hour battery life, high-fidelity spatial audio.")
                    .price(new BigDecimal("149.99"))
                    .stockQuantity(45)
                    .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80")
                    .rating(4.8)
                    .category(electronics)
                    .active(true)
                    .build());

            products.add(Product.builder()
                    .name("Veloce Ultra 15 Pro Laptop")
                    .description("Next-gen M-architecture 10-core CPU, 16GB RAM, 512GB NVMe SSD, 120Hz display.")
                    .price(new BigDecimal("1199.00"))
                    .stockQuantity(20)
                    .imageUrl("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80")
                    .rating(4.9)
                    .category(electronics)
                    .active(true)
                    .build());

            products.add(Product.builder()
                    .name("PulseFit GPS Smartwatch Series 7")
                    .description("Comprehensive health tracking, ECG, SpO2 sensor, always-on AMOLED touchscreen.")
                    .price(new BigDecimal("199.50"))
                    .stockQuantity(60)
                    .imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80")
                    .rating(4.7)
                    .category(electronics)
                    .active(true)
                    .build());

            products.add(Product.builder()
                    .name("Classic Oxford Leather Dress Shoes")
                    .description("Handcrafted genuine full-grain Italian leather with Goodyear welted sole.")
                    .price(new BigDecimal("129.00"))
                    .stockQuantity(35)
                    .imageUrl("https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80")
                    .rating(4.7)
                    .category(fashion)
                    .active(true)
                    .build());

            products.add(Product.builder()
                    .name("AromaMaster Automatic Espresso Machine")
                    .description("19-bar Italian high pressure pump, integrated conical burr grinder, precision milk wand.")
                    .price(new BigDecimal("349.00"))
                    .stockQuantity(18)
                    .imageUrl("https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&q=80")
                    .rating(4.7)
                    .category(home)
                    .active(true)
                    .build());

            products.add(Product.builder()
                    .name("ProGrip Non-Slip Eco Yoga Mat")
                    .description("6mm high-density natural tree rubber with laser-engraved alignment lines.")
                    .price(new BigDecimal("49.99"))
                    .stockQuantity(75)
                    .imageUrl("https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80")
                    .rating(4.8)
                    .category(sports)
                    .active(true)
                    .build());

            products.add(Product.builder()
                    .name("Mastering Modern Full-Stack Architecture")
                    .description("Comprehensive guide covering microservices, Spring Boot, React, and cloud deployments.")
                    .price(new BigDecimal("44.99"))
                    .stockQuantity(65)
                    .imageUrl("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80")
                    .rating(4.9)
                    .category(books)
                    .active(true)
                    .build());

            products.add(Product.builder()
                    .name("Botanical Radiant Glow Vitamin C Serum")
                    .description("Concentrated 20% Vitamin C with pure hyaluronic acid and botanical ferulic acid.")
                    .price(new BigDecimal("38.00"))
                    .stockQuantity(90)
                    .imageUrl("https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80")
                    .rating(4.8)
                    .category(beauty)
                    .active(true)
                    .build());

            productRepository.saveAll(products);
            log.info("Successfully seeded catalog items.");
        }
    }
}
