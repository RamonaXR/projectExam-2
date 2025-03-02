# Holidaze

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-7.1.3-blue.svg)](https://reactrouter.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-blue.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-blue.svg)](https://vitejs.dev/)
[![React Query](https://img.shields.io/badge/React_Query-5.65.1-blue.svg)](https://tanstack.com/query/latest)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.3-blue.svg)](https://github.com/pmndrs/zustand)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.54.2-blue.svg)](https://react-hook-form.com/)
[![Yup](https://img.shields.io/badge/Yup-1.6.1-blue.svg)](https://github.com/jquense/yup)
[![Prettier](https://img.shields.io/badge/Prettier-3.4.2-blue.svg)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/ESLint-9.17.0-blue.svg)](https://eslint.org/)
[![Headless UI](https://img.shields.io/badge/Headless_UI-2.2.0-blue.svg)](https://headlessui.dev/)

![Project Logo](projectExam-2/logoholidaze.svg)

Holidaze is an eco-friendly venue booking platform that connects travellers with amazing venues and helps venue managers list and manage their properties. Built with modern React libraries and tools, Holidaze provides a smooth user experience with robust form validation, state management, and fast performance.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [User Stories](#user-stories)
- [Technical Restrictions](#technical-restrictions)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## Features

- **Venue Discovery:** Browse and search for amazing venues.
- **Venue Details:** View detailed information including images, rating, amenities, owner info, and descriptions.
- **Booking System:** Registered travellers can create and manage bookings.
- **Venue Management:** Venue managers can add, edit, and delete their venues, as well as view bookings on their properties.
- **User Authentication:** Login and registration with validation (using React Hook Form and Yup) for travellers and venue managers.
- **Responsive Design:** Optimized for all devices with Tailwind CSS.
- **SEO-Friendly:** Dynamic meta tags and titles managed with React Helmet Async.
- **Infinite Scrolling:** Seamless data loading for venue listings.

## Screenshots

![Screen shot of the holidaze site](./public/img/readme1.png)
![Screen shot of the holidaze site](./public/img/readme2.png)
![Screen shot of the holidaze site](./public/img/readme3.png)
![Screen shot of the holidaze site](./public/img/readme4.png)
![Screen shot of the holidaze site](./public/img/readme5.png)

## User Stories

-A user may view a list of Venues
-A user may search for a specific Venue
-A user may view a specific Venue page by id
-A user may view a calendar with available dates for a Venue
-A user with a stud.noroff.no email may register as a customer
-A registered customer may create a booking at a Venue
-A registered customer may view their upcoming bookings
-A user with a stud.noroff.no email may register as a Venue manager
-A registered Venue manager may create a Venue
-A registered Venue manager may update a Venue they manage
-A registered Venue manager may delete a Venue they manage
-A registered Venue manager may view bookings for a Venue they manage
-A registered user may login
-A registered user may update their avatar
-A registered user may logout

## Technical Restrictions

- Must use an approved JavaScript framework.
- Must use an approved CSS framework.
- Must be hosted on an approved static host.
- Must use approved design and planning applications.

## Tech Stack

- **React** – UI library for building the user interface.
- **React Router** – For client-side routing.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **Vite** – Next Generation frontend tooling for fast development.
- **React Query (TanStack Query)** – Data fetching, caching, and synchronization.
- **React Hook Form** – Form management with minimal re-renders.
- **Yup** – Schema validation.
- **Zustand** – Small, fast, scalable state-management solution.
- **React Helmet Async** – Managing meta tags for SEO.
- **React Icons** – Icon library.
- **React Datepicker** – Date picking component.
- **React Toastify** – Notifications.
- **ESLint, Prettier, Husky, Lint-Staged** – Code quality and formatting tools.

### Installation

1. Clone the repository:

```bash
git clone git@github.com:RamonaXR/projectExam-2.git
```

2.  Install the dependencies:

```bash
npm install
```

### Running

To run the app in development mode, use the following command:

```bash
npm run dev
```

To build the app for production, use the following command:

```bash
npm run build
```
