# Naveen Kumar Taxi Service - Design Guidelines

## Design Approach
**Reference-Based Approach** drawing inspiration from Uber and Ola with professional service aesthetics. Clean, trustworthy design optimized for quick booking across all age groups with prominent contact options and visual vehicle showcase.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 210 100% 50% (Professional deep blue for CTAs, trust)
- Secondary: 200 18% 46% (Muted blue-gray for secondary elements)
- Surface: 0 0% 100% (Clean white)
- Surface Secondary: 210 20% 98% (Subtle off-white for sections)
- Text Primary: 215 25% 15% (Deep charcoal)
- Text Secondary: 215 15% 45% (Medium gray)
- Success: 142 76% 36% (Confirmed bookings)
- Accent: 45 93% 58% (WhatsApp green for integration)

**Dark Mode:**
- Primary: 210 100% 55% (Brighter blue)
- Surface: 215 28% 9% (Rich dark)
- Surface Secondary: 215 25% 14% (Card backgrounds)
- Text Primary: 210 20% 98% (Near white)
- Text Secondary: 215 15% 70% (Light gray)

### B. Typography
**Families:**
- Primary: 'Poppins' - Modern, friendly, excellent Hindi/Tamil readability
- Accent: 'Outfit' - Clean geometric for headings

**Scale:**
- Hero: text-5xl md:text-6xl font-bold
- Section Headers: text-3xl md:text-4xl font-semibold
- Vehicle Cards: text-xl font-semibold
- Body: text-base md:text-lg (larger for readability)
- Metadata: text-sm font-medium

### C. Layout System
**Spacing Units:** Consistent 4, 8, 12, 16, 24, 32 (p-4, gap-8, py-12, mt-16)

**Breakpoints:**
- Mobile (base): Single column, stacked layout, touch-optimized 48px minimum
- Tablet (md:768px): 2-column vehicle grid, side-by-side booking steps
- Desktop (lg:1024px): 3-column fleet, expanded booking flow
- Max container: max-w-7xl centered

### D. Component Library

**Navigation:**
- Sticky transparent-to-solid header with blur backdrop
- Logo left, navigation center, CTA right (Book Now button)
- Mobile: Hamburger with full-screen overlay menu
- Always-visible phone number in header (click-to-call)

**Hero Section:**
- Large hero image (60vh mobile, 75vh desktop) showing professional taxi with Thiruvannamalai landmark
- Gradient overlay: linear from 210 100% 50% at 60% opacity to transparent
- Centered booking widget overlay with blurred glass-morphism background
- Quick action chips: "Airport Transfer" "Outstation" "Hourly Rental"

**Floating Action Buttons:**
- Bottom-right cluster (mobile) / Right edge (desktop)
- Primary: WhatsApp (45 93% 58% green)
- Secondary: Telegram (199 98% 48% blue)
- Tertiary: Phone call (210 100% 50%)
- Stack with 8px gap, 56px diameter, shadow-lg

**Vehicle Fleet Cards:**
- Elevated white cards with vehicle photo (16:9 aspect ratio)
- Vehicle type badge (Sedan/SUV/Innova/MUV)
- Capacity icons (passengers/luggage)
- Starting price display with "From ₹X/km"
- "Book Now" button + "View Details" link
- Hover: gentle lift (scale-[1.02]) with shadow enhancement

**Booking Workflow (Multi-Step):**
- Step indicator: numbered circles with connecting lines
- Card-based steps: Pickup/Drop → Vehicle Selection → Date/Time → Fare Review → Confirm
- Animated background: Subtle moving gradient on step transitions (200ms ease)
- Progress bar at top with percentage completion
- Fare calculator live update panel (sticky sidebar on desktop, collapsible on mobile)

**Fare Calculator:**
- Input fields: Distance/Hours with real-time calculation
- Vehicle type selection radio cards
- Toll/waiting charges toggles
- Large total display with breakdown accordion
- "Get Quote on WhatsApp" button

**Contact Integration:**
- WhatsApp share button with pre-filled booking message template
- Telegram quick contact with location sharing
- Click-to-call with confirmation dialog (prevents accidental taps)

**Trust Indicators:**
- Customer testimonial carousel (3 cards, auto-rotate 5s)
- Driver photos with ratings (circular crops, 80px)
- License/certification badges
- "Available 24/7" prominent banner

### E. Animations
**Minimal & Purposeful:**
- Hero background: Subtle parallax scroll (0.5 speed)
- Booking steps: Slide-in transitions (300ms)
- Vehicle cards: Fade-in on scroll with stagger (100ms delay between)
- Floating buttons: Gentle pulse on page load, then static
- Loading states: Rotating circle, no complex animations

## Images

**Hero Section:**
- Primary hero: Professional taxi (Innova preferred) with Thiruvannamalai Annamalaiyar Temple backdrop
- Dimensions: 1920x1080, optimized for web
- Treatment: Blue gradient overlay from bottom-left (210 100% 50% at 60%)
- Position: Top of homepage, 60-75vh height

**Vehicle Fleet:**
- High-quality photos of each vehicle type (Sedan, SUV, Innova, MUV)
- Clean white/light background studio shots
- Consistent 16:9 aspect ratio across all vehicles
- Side-angle view showing vehicle character

**Supporting Images:**
- Driver portraits: Professional headshots, circular crops
- Service areas: Thiruvannamalai landmarks in gallery (Girivalam path, temple)
- Trust section: Handshake/customer satisfaction imagery
- Empty states: Friendly car illustration for "No bookings yet"

**Image Placement:**
- Homepage: Hero image + vehicle showcase grid
- Booking page: Selected vehicle thumbnail in summary panel
- About section: Team photos + service area map
- Footer: Small landmark silhouettes

## Key Sections Structure

**Homepage:**
- Hero with embedded booking widget (pickup/drop quick form)
- Vehicle fleet grid (4 cards, 1 mobile / 2 tablet / 4 desktop columns)
- "Why Choose Us" - 3 pillars (Experience, Safety, Affordability) with icons
- Service areas map with pin markers
- Customer testimonials carousel
- WhatsApp integration banner "Book via WhatsApp in 30 seconds"

**Booking Flow Page:**
- Multi-step wizard with persistent fare calculator sidebar
- Breadcrumb navigation for step tracking
- Vehicle comparison view (side-by-side on desktop)
- Confirmation page with booking ID, driver assignment, trip details

**Fleet Details Page:**
- Large vehicle gallery (carousel with thumbnails)
- Specifications table (capacity, features, amenities)
- Pricing breakdown with distance tiers
- Related vehicles suggestions

**Contact Page:**
- Split layout: Contact form left, map/details right
- Direct action cards: WhatsApp, Telegram, Phone (large tap targets 64px)
- Office hours and response time display
- FAQ accordion for common queries