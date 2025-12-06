# AM Chat - Modern Web Messaging App

A premium, glassmorphic real-time messaging application built with React, Vite, and Firebase.

![AM Chat Logo](public/vite.svg)

## Features

- **Real-time Messaging**: Instant message delivery using Firebase Firestore.
- **Modern UI**: 
  - Glassmorphism design system.
  - Animated mesh gradients.
  - Dark mode aesthetic with neon accents.
- **Media Sharing**: 
  - Send and receive **Photos** (rendered inline).
  - Share **Documents/PDFs** (with download links).
- **Contact Management**: 
  - Save contacts with custom nicknames.
  - Interactive profile cards.
- **Authentication**: Secure Google Sign-In integration.
- **Responsive**: Fully optimized for Desktop, Tablet, and Mobile.

## Tech Stack

- **Frontend**: React 18, Vite.
- **Styles**: CSS3 (Variables, Flexbox, Glassmorphism).
- **Backend (Serverless)**: 
  - **Auth**: Firebase Authentication (Google).
  - **Database**: Firestore (Real-time).
  - **Storage**: Firebase Storage (Media).
- **Testing**: Vitest, React Testing Library.

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd whatsapp-clone
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Setup**:
   - Create a project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Google Provider).
   - Enable **Firestore Database**.
   - Enable **Storage**.
   - Copy your firebase config into `src/firebase.js`.

4. **Run Locally**:
   ```bash
   npm run dev
   ```

5. **Run Tests**:
   ```bash
   npm run test
   ```

## Usage Guide

- **Login**: Use your Google account to sign in.
- **New Chat**: Click the `+` icon in the sidebar. Enter an email and a **custom name** for the contact.
- **Send Media**: Click the **Paperclip** icon in the chat bar to upload photos or files.
- **View Profile**: Click on any user avatar to see their details or **Logout**.

## License

MIT
