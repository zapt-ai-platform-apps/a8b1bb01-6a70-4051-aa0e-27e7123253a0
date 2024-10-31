# Atlas Live Pro App

Atlas Live Pro App is a web application that allows users to stream IPTV channels directly from their browser. Users can enter their code (username) and password to access and watch live TV channels seamlessly. The app provides a professional-grade video player for an enhanced viewing experience.

## User Journey

1. **Open the App**: The user opens the Atlas Live Pro App in their web browser.

2. **Enter Code and Password**: On the main page, there are input fields where the user can enter their code (username) and password.

3. **Login and Auto-Stream**: After entering the code and password, the user clicks the "Login" button. The app authenticates the user and automatically loads and starts playing the live IPTV stream without any additional steps.

4. **Watch Live TV**: The live TV channel starts playing immediately in the integrated professional video player. The user can now watch the live TV channel.

5. **Stream Controls**: The app uses a professional video player with advanced controls such as play, pause, volume control, fullscreen mode, and more.

6. **Logout**: If the user wishes to log out, they can click the "Logout" button to return to the login screen.

## Features

- **Secure Access**: Users authenticate using their unique code and password to access the IPTV streams.

- **Auto-Streaming**: After successful login, the app automatically loads and plays the live IPTV stream without any further action required from the user.

- **Professional Video Player**: Uses a professional-grade video player for enhanced user experience with advanced controls.

- **Responsive Design**: The app is responsive and works well on various screen sizes, including desktops, tablets, and mobile devices.

- **Loading Indicator**: The app provides feedback while the stream is loading to enhance user experience.

- **Error Handling**: If there's an issue loading the stream, the app will notify the user.

## External Services

- **Progressier**: Used for adding Progressive Web App (PWA) functionality, allowing users to install the app on their devices and use it like a native app.

- **Sentry**: Integrated for error logging and monitoring to improve app stability and performance.

## How to Use

1. Open the Atlas Live Pro App in your web browser.

2. In the input fields, enter your code (username) and password provided by your IPTV service.

3. Click the "Login" button.

4. The app will authenticate your credentials and automatically load and play the live IPTV stream.

5. Use the video player's advanced controls to manage playback as needed.

6. To log out, click the "Logout" button.

## Environment Variables

- `VITE_PUBLIC_SENTRY_DSN`: Your Sentry DSN for error logging.

- `VITE_PUBLIC_APP_ENV`: The environment the app is running in (e.g., production, development).

- `VITE_PUBLIC_APP_ID`: The App ID for PWA functionality with Progressier.

## Notes

- Ensure that your browser supports HLS (HTTP Live Streaming). Modern browsers should support this, but if you encounter issues, try updating your browser or using a different one.

- The app requires a valid code and password to access the IPTV streams. These should be provided by your IPTV service provider.

- The app does not store your code and password; they are used only to generate the stream URL during your session.

- The app uses a professional video player for an enhanced viewing experience.
