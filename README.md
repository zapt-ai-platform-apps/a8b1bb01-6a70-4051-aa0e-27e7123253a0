# Atlas Live Pro App

Atlas Live Pro App is a web application that allows users to stream IPTV channels directly from their browser. Users can enter their code (username) and password to access and watch live TV channels seamlessly.

## User Journey

1. **Open the App**: The user opens the Atlas Live Pro App in their web browser.

2. **Enter Code and Password**: On the main page, there are input fields where the user can enter their code (username) and password.

3. **Login**: After entering the code and password, the user clicks the "Login" button.

4. **Load Stream**: Once authenticated, the user clicks the "Load Stream" button to start streaming.

5. **Watch Live TV**: The app generates the stream URL using the provided code and password and plays it in the integrated video player. The user can now watch the live TV channel.

6. **Stream Controls**: The user can control the playback using standard video controls such as play, pause, volume control, and fullscreen mode.

7. **Logout**: If the user wishes to log out, they can click the "Logout" button to return to the login screen.

## Features

- **Secure Access**: Users authenticate using their unique code and password to access the IPTV streams.

- **Stream Live IPTV Channels**: Once logged in, users can watch live channels directly in the app.

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

4. Once logged in, click the "Load Stream" button.

5. Wait for the stream to load. Once loaded, the live TV channel will start playing in the video player.

6. Use the video controls to manage playback as needed.

7. To log out, click the "Logout" button.

## Environment Variables

- `VITE_PUBLIC_SENTRY_DSN`: Your Sentry DSN for error logging.

- `VITE_PUBLIC_APP_ENV`: The environment the app is running in (e.g., production, development).

- `VITE_PUBLIC_APP_ID`: The App ID for PWA functionality with Progressier.

## Notes

- Ensure that your browser supports HLS (HTTP Live Streaming). Modern browsers should support this, but if you encounter issues, try updating your browser or using a different one.

- The app requires a valid code and password to access the IPTV streams. These should be provided by your IPTV service provider.

- The app does not store your code and password; they are used only to generate the stream URL during your session.
