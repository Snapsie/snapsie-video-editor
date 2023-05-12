import NavBar from './components/NavBar';
import PropertiesEditor from './components/PropertiesEditor';
import TimelinePanel from './components/TimelinePanel';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';

function Editor() {
  return (
    <div className="h-screen flex flex-col border-t-2 border-gray-700">
      <div className="flex-grow">
        <div className="flex flex-row h-full border-b-2">
          <div className="w-1/10 border-r-2">
            <NavBar />
          </div>
          <div className="w-2/10 border-r-2">
            <VideoList />
          </div>
          <div className="w-5/10 flex flex-grow border-r-2 items-center justify-center">
            <VideoPlayer />
          </div>
          <div className="w-2/10 bg-red-300 border-r-2">
            <PropertiesEditor />
          </div>
        </div>
      </div>
      <div className="h-2/5">
        <TimelinePanel />
      </div>
    </div>
  );
}

export default Editor;
