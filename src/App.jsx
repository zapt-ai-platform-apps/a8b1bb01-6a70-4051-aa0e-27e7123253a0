import { createSignal, Show } from 'solid-js';
import { onMount } from 'solid-js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

function App() {
  const [code, setCode] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  let videoRef;
  let playerRef;

  const login = () => {
    if (code() && password()) {
      setIsAuthenticated(true);
      initializePlayer();
    } else {
      alert('Please enter both code and password');
    }
  };

  const logout = () => {
    if (playerRef) {
      playerRef.dispose();
      playerRef = null;
    }
    setIsAuthenticated(false);
    setCode('');
    setPassword('');
  };

  const initializePlayer = () => {
    if (videoRef) {
      playerRef = videojs(videoRef, {
        controls: true,
        autoplay: true,
        preload: 'auto',
        fluid: true,
      });
      loadStream();
    }
  };

  const loadStream = () => {
    const streamURL = `https://apsmart.in:80/get.php?username=${code()}&password=${password()}&type=m3u_plus&output=ts`;
    if (!streamURL) return;
    setIsLoading(true);

    playerRef.src({
      src: streamURL,
      type: 'application/vnd.apple.mpegurl',
    });

    playerRef.on('loadedmetadata', () => {
      playerRef.play().then(() => {
        setIsLoading(false);
      }).catch((error) => {
        console.error('Error playing stream:', error);
        setIsLoading(false);
        alert('Error playing stream');
      });
    });

    playerRef.on('error', (error) => {
      console.error('Error loading stream:', error);
      setIsLoading(false);
      alert('Error loading stream');
    });
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center">
      <h1 class="text-4xl font-bold text-purple-600 mb-8">Atlas Live Pro App</h1>
      <Show when={!isAuthenticated()}>
        <div class="w-full max-w-md">
          <input
            type="text"
            placeholder="Enter Code"
            value={code()}
            onInput={(e) => setCode(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none box-border text-black"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none box-border text-black mt-4"
          />
          <button
            onClick={login}
            class={`w-full mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${!code() || !password() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!code() || !password()}
          >
            Login
          </button>
        </div>
      </Show>
      <Show when={isAuthenticated()}>
        <div class="w-full max-w-4xl h-full">
          <div class="flex justify-between items-center mb-4 w-full">
            <button
              onClick={logout}
              class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              Logout
            </button>
          </div>
          <Show when={isLoading()}>
            <div class="text-center text-purple-600 font-bold">Loading stream...</div>
          </Show>
          <div class="w-full h-full">
            <div data-vjs-player>
              <video
                ref={videoRef}
                class="video-js vjs-default-skin vjs-big-play-centered w-full h-auto rounded-lg"
                controls
                preload="auto"
              ></video>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;