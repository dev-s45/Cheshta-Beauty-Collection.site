
/* =========================================================
   CHESHTA BEAUTY COLLECTION
   Website Interactions & WhatsApp Booking
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------------------------------
    // 1. CONFIGURATION
    // -----------------------------------------------------

    const WHATSAPP_NUMBER = "919278095012";

    const BUSINESS_NAME = "Cheshta Beauty Collection";


    // -----------------------------------------------------
    // 2. ELEMENTS
    // -----------------------------------------------------

    const menuToggle = document.getElementById("menuToggle");

    const mainNavigation = document.getElementById("mainNavigation");

    const currentYear = document.getElementById("currentYear");

    const bookingButtons = document.querySelectorAll(".book-service");


    // -----------------------------------------------------
    // 3. UPDATE COPYRIGHT YEAR
    // -----------------------------------------------------

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // -----------------------------------------------------
    // 4. MOBILE NAVIGATION
    // -----------------------------------------------------

    function closeMobileMenu() {

        if (!menuToggle || !mainNavigation) {
            return;
        }

        menuToggle.classList.remove("active");

        mainNavigation.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    function openMobileMenu() {

        if (!menuToggle || !mainNavigation) {
            return;
        }

        menuToggle.classList.add("active");

        mainNavigation.classList.add("open");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }


    if (menuToggle && mainNavigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNavigation.classList.contains("open");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });


        // Close menu when a navigation link is clicked.

        const navigationLinks =
            mainNavigation.querySelectorAll("a");

        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMobileMenu();
            });

        });


        // Close menu when the user clicks outside it.

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                mainNavigation.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                mainNavigation.classList.contains("open")
            ) {
                closeMobileMenu();
            }

        });


        // Close the mobile menu when returning to desktop layout.

        window.addEventListener("resize", () => {

            if (window.innerWidth > 760) {
                closeMobileMenu();
            }

        });

    }


    // -----------------------------------------------------
    // 5. WHATSAPP BOOKING MESSAGE
    // -----------------------------------------------------

    function createBookingMessage(service, price) {

        const isCustomService =
            service.toLowerCase() === "custom nail art";

        if (isCustomService) {

            return [
                `Hi ${BUSINESS_NAME}! 💅✨`,
                "",
                "I'd like to discuss a custom nail art design.",
                "",
                "Service: Custom Nail Art",
                "Price: To be confirmed",
                "",
                "Please let me know the available appointment slots",
                "and the estimated price for my preferred design.",
                "",
                "Thank you! 💗"
            ].join("\n");

        }


        return [
            `Hi ${BUSINESS_NAME}! 💅✨`,
            "",
            "I'd like to book a nail appointment.",
            "",
            `Service: ${service}`,
            `Price: ₹${price}`,
            "",
            "Please let me know the available appointment slots.",
            "",
            "Thank you! 💗"
        ].join("\n");

    }


    function openWhatsAppBooking(service, price) {

        if (!service || !price) {
            return;
        }

        const message = createBookingMessage(
            service,
            price
        );

        const encodedMessage =
            encodeURIComponent(message);

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


        // Open WhatsApp in a new tab or the WhatsApp app.

        const whatsappWindow = window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );


        // Fallback if the browser blocks the new window.

        if (!whatsappWindow) {

            window.location.href = whatsappURL;

        }

    }


    // -----------------------------------------------------
    // 6. INDIVIDUAL SERVICE BOOKING BUTTONS
    // -----------------------------------------------------

    bookingButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const service = button.dataset.service;

            const price = button.dataset.price;

            openWhatsAppBooking(service, price);

        });

    });


    // -----------------------------------------------------
    // 7. OPTIONAL: ESCAPE KEY CLOSES MOBILE MENU
    // -----------------------------------------------------

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            mainNavigation &&
            mainNavigation.classList.contains("open")
        ) {
            closeMobileMenu();
        }

    });

});
