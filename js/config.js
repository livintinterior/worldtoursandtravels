/**
 * ============================================================================
 *  WORLDS TOURS AND TRAVELS — SITE CONFIGURATION
 * ============================================================================
 *  Change every value in this file to re-brand or update contact details
 *  across the ENTIRE website. Every page reads from window.SITE_CONFIG —
 *  nothing else needs to be edited.
 *
 *  ⚠️ REPLACE THE PLACEHOLDER PHONE / WHATSAPP / EMAIL / ADDRESS BELOW
 *     WITH YOUR REAL BUSINESS DETAILS BEFORE GOING LIVE.
 * ============================================================================
 */
window.SITE_CONFIG = {
  // ---------------------------------------------------------------------
  // Core identity
  // ---------------------------------------------------------------------
  businessName: "Worlds Tours and Travels",
  shortName: "Worlds Tours",
  tagline: "Reliable Cab & Bus Services for Every Journey",
  logo: "images/logo.svg",
  logoAlt: "Worlds Tours and Travels logo",
  websiteUrl: "https://www.worldstoursandtravels.com",

  // ---------------------------------------------------------------------
  // Contact details — used for tel:, mailto:, wa.me links & schema
  // ---------------------------------------------------------------------
  phoneDisplay: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsappNumber: "919876543210", // digits only, country code, no + or spaces
  email: "info@worldstoursandtravels.com",

  address: {
    line1: "Plot No. 12, NH-65 Service Road",
    line2: "Near RTC Bus Stand",
    city: "Tirupati",
    state: "Andhra Pradesh",
    pincode: "517501",
    country: "India",
    full: "Plot No. 12, NH-65 Service Road, Near RTC Bus Stand, Tirupati, Andhra Pradesh 517501, India"
  },

  // Google Maps — replace with your own "Embed a map" src URL from Google Maps
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.9!2d79.4192!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d5f0b0b0b0b0b%3A0x0!2sTirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Worlds+Tours+and+Travels+Tirupati",

  businessHours: {
    weekdays: "Monday – Saturday: 6:00 AM – 11:00 PM",
    sunday: "Sunday: 7:00 AM – 10:00 PM",
    note: "24×7 Emergency & Airport Transfer Service Available"
  },

  // ---------------------------------------------------------------------
  // Social links — leave blank string to hide an icon in the footer
  // ---------------------------------------------------------------------
  social: {
    facebook: "https://facebook.com/worldstoursandtravels",
    instagram: "https://instagram.com/worldstoursandtravels",
    twitter: "https://twitter.com/worldstours",
    youtube: "https://youtube.com/@worldstoursandtravels",
    linkedin: "https://linkedin.com/company/worldstoursandtravels"
  },

  // ---------------------------------------------------------------------
  // Stats shown in the hero section (animated counters)
  // ---------------------------------------------------------------------
  stats: [
    { value: 5000, suffix: "+", label: "Happy Customers" },
    { value: 24, prefix: "", suffix: "x7", label: "Service Availability" },
    { value: 100, suffix: "+", label: "Vehicles in Fleet" },
    { value: 10, suffix: "+", label: "Years of Experience" }
  ],

  // ---------------------------------------------------------------------
  // SEO defaults
  // ---------------------------------------------------------------------
  seo: {
    titleSuffix: " | Worlds Tours and Travels",
    defaultDescription:
      "Worlds Tours and Travels provides reliable cab services, airport transfers, outstation taxi, luxury bus booking, tempo traveller rental, corporate transportation, tour packages, and 24×7 travel services.",
    keywords:
      "Cab Service, Taxi Service, Bus Service, Bus Booking, Travel Agency, Tours and Travels, Airport Taxi, Airport Transfer, Outstation Taxi, Tempo Traveller, Luxury Bus, Corporate Transport, Tour Packages, Car Rental, Local Taxi",
    googleSiteVerification: "PASTE-YOUR-GOOGLE-SITE-VERIFICATION-CODE-HERE",
    themeColor: "#1E3A8A"
  },

  // Service areas listed in the "Service Area" section
  serviceAreas: [
    "Tirupati", "Chittoor", "Renigunta", "Srikalahasti", "Nellore",
    "Chennai", "Bangalore", "Hyderabad", "Vijayawada", "Kadapa"
  ]
};
