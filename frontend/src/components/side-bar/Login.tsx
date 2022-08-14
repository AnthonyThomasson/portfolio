import { useRef } from "react";
import "./../../styles/Login.css";


function Search() {

  const usernameInput = useRef(null)
  const passwordInput = useRef(null)

  return (
    <div className="login-content">
      <input type="text" placeholder="Username" ref={usernameInput} />
      <input type="password" placeholder="Password" ref={passwordInput}/>
      <button onClick={() => alert("This feature is not yet working")}>Login</button>
    </div>
  );
  
}


export default Search;
