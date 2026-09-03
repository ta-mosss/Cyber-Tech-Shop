# TechStore – Multi‑vendor Electronics Aggregator

A modern, responsive e‑commerce store built with Next.js (ISR) and deployed on Netlify. It aggregates product catalogs from multiple vendors (JSON, CSV, REST) using a clean adapter pattern.

## Features

- **Vendor Adapter Pattern** – easily add new data sources
- **ISR** – fast static pages with automatic revalidation
- **Stripe Checkout** – secure payment processing
- **Dark‑first UI** – modern, accessible design
- **Search & Filters** – category, price, text search
- **Persistent Cart** – local storage

## Adding a New Vendor

1. Create a new configuration object in `src/lib/vendors.config.ts`.
2. If the source type is not yet supported, implement a new adapter class in `src/adapters/` implementing `IVendorAdapter`.
3. Update the factory in `src/adapters/factory.ts`.
4. Store any secrets (API keys) in Netlify environment variables.

## Environment Variables

- `STRIPE_SECRET_KEY` – your Stripe secret key
- `SMARTHOME_API_KEY` – example vendor key (add your own as needed)

## Development

```bash
npm install
npm run dev
