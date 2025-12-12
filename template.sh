# Actions
mkdir -p actions && touch actions/admin.ts actions/appointments.ts actions/credits.ts actions/doctor.ts actions/doctors-listing.ts actions/onboarding.ts actions/patient.ts actions/payout.ts

# Components
mkdir -p components && touch components/appointment-card.tsx components/header.tsx components/page-header.tsx components/pricing.tsx components/theme-provider.tsx

# Lib
mkdir -p lib && touch lib/checkUser.ts lib/data.ts lib/prisma.ts lib/schema.ts lib/specialities.ts lib/utils.ts lib/private.key

# Main section structure
mkdir -p main/admin main/appointments main/doctor main/doctors main/onboarding main/pricing main/video-call

# Admin
touch main/admin/_components/pending-doctors.tsx main/admin/_components/pending-payouts.tsx main/admin/_components/verified-doctors.tsx main/admin/layout.tsx main/admin/page.tsx

# Appointments
touch main/appointments/page.tsx

# Doctor
mkdir -p main/doctor/_components main/doctor/verification
touch main/doctor/_components/appointments-list.tsx \
      main/doctor/_components/availability-settings.tsx \
      main/doctor/_components/doctor-earnings.tsx \
      main/doctor/page.tsx \
      main/doctor/layout.tsx \
      main/doctor/verification/page.tsx
