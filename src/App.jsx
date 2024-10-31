import { createSignal, Show } from 'solid-js';
import Hls from 'hls.js';

function App() {
  const [code, setCode] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  let videoRef;

  const login = () => {
    if (code() && password()) {
      setIsAuthenticated(true);
    } else {
      alert('Please enter both code and password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCode('');
    setPassword('');
  };

  const loadStream = () => {
    const streamURL = `https://apsmart.in:80/get.php?username=${code()}&password=${password()}&type=m3u_plus&output=ts`;
    if (!streamURL) return;
    setIsLoading(true);

    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.loadSource(streamURL);
      hls.attachMedia(videoRef);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.play();
        setIsLoading(false);
      });
      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error(data);
        setIsLoading(false);
        alert('Error loading stream');
      });
    } else if (videoRef.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.src = streamURL;
      videoRef.addEventListener('loadedmetadata', function () {
        videoRef.play();
        setIsLoading(false);
      });
    } else {
      console.error('This browser does not support HLS');
      setIsLoading(false);
      alert('This browser does not support HLS');
    }
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
        <div class="w-full max-w-4xl">
          <div class="flex justify-between items-center mb-4">
            <button
              onClick={logout}
              class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              Logout
            </button>
            <button
              onClick={loadStream}
              class={`px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${isLoading() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading()}
            >
              {isLoading() ? 'Loading...' : 'Load Stream'}
            </button>
          </div>
          <div class="w-full h-full">
            <video
              ref={videoRef}
              controls
              class="w-full h-auto bg-black rounded-lg"
            />
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;