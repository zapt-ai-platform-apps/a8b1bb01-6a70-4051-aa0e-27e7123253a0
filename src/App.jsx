import { createSignal } from 'solid-js';
import Hls from 'hls.js';

function App() {
  const [streamURL, setStreamURL] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  let videoRef;

  const loadStream = () => {
    if (!streamURL()) return;
    setIsLoading(true);
    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.loadSource(streamURL());
      hls.attachMedia(videoRef);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.play();
        setIsLoading(false);
      });
      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error(data);
        setIsLoading(false);
      });
    } else if (videoRef.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.src = streamURL();
      videoRef.addEventListener('loadedmetadata', function () {
        videoRef.play();
        setIsLoading(false);
      });
    } else {
      console.error('This browser does not support HLS');
      setIsLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center">
      <h1 class="text-4xl font-bold text-purple-600 mb-8">Atlas Live Pro App</h1>
      <div class="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter IPTV Stream URL (m3u8)"
          value={streamURL()}
          onInput={(e) => setStreamURL(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none box-border text-black"
        />
        <button
          onClick={loadStream}
          class={`w-full mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${isLoading() || !streamURL() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading() || !streamURL()}
        >
          {isLoading() ? 'Loading...' : 'Load Stream'}
        </button>
      </div>
      <div class="w-full max-w-4xl mt-8 h-full">
        <video
          ref={videoRef}
          controls
          class="w-full h-auto bg-black rounded-lg"
        />
      </div>
    </div>
  );
}

export default App;