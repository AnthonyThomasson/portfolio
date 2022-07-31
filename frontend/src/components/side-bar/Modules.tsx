
function Modules() {
  return (
    <div className="modules">
      <div className="top-modules">
        <button className="module active">
          <span className="files-icon" />
        </button>
        <button className="module">
          <span className="search-icon" />
        </button>
        <button className="module">
          <span className="git-icon" />
        </button>
        <button className="module">
          <span className="debugger-icon" />
        </button>
        <button className="module">
          <span className="docker-icon" />
        </button>
        <button className="module">
          <span className="test-icon" />
        </button>
        <button className="module">
          <span className="databases-icon" />
        </button>
        <button className="module">
          <span className="live-share-icon" />
        </button>
        <button className="module">
          <span className="modules-icon" />
        </button>
      </div>
      <div className="bottom-modules">
        <button className="module">
          <span className="profile-icon" />
        </button>
        <button className="module">
          <span className="settings-icon" />
        </button>
      </div>
    </div>
  );
}

export default Modules;
