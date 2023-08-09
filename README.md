# Velocikey
![2023-08-09-13-40-36](https://github.com/finnjacobs99/velocikey/assets/32391644/1870303b-86d8-410c-9df2-cd9640f71c2a)

## Description
Velocikey is an online typing test platform designed to measure your typing speed and accuracy. Complete tests to see your words-per-minute (WPM) and typing accuracy in real time, or create an account to track your results and compete with others on the global leaderboard.

### Built With
- React
- HTML
- CSS
- Javascript
- TailwindCSS
- Firebase

## Getting Started
To get a local copy of this project up and running follow the steps listed below

### Prerequisites
- npm
```
npm install npm@latest -g
```

### Installation
1. Clone the repo
```
git clone https://github.com/finnjacobs99/velocikey.git
```

3. Install npm packages
```
npm install
```

### Firebase Setup
This app uses Firebase as a backend, so you will have to follow these steps for it to work properly

1. Navigate to https://console.firebase.google.com/ and create an account/sign in
2. Create a new Firebase project and register a new web app
3. When presented with your Firebase config, create a .env.local file in the root directory and paste the following code with your config values
```
VITE_FIREBASE_API_KEY="example-apiKey"
VITE_FIREBASE_AUTH_DOMAIN="example-authDomain"
VITE_FIREBASE_PROJECT_ID="example-projectID"
VITE_FIREBASE_STORAGE_BUCKET="example-storageBucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="example-messagingSenderId"
VITE_FIREBASE_APP_ID="example-appId"
```
4. From the Project Overview page, navigate to Authentication > Set up sign-in method > Add new provider > Email and password > Enable
5. Follow the same instructions from the previous step, but with the Google provider
6. From the Project Overview page, navigate to Cloud Firestore > Create database

## Usage
Once you've completed all the steps for setup and installation, enter the following command into your terminal to run a local development server
```
npm run dev
```

## Contact
Finn Jacobs - finn.jacobs99@gmail.com

Project Link: https://github.com/finnjacobs99/velocikey
