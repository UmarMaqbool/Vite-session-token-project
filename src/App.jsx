import { useState } from "react";
import "./App.css";

const App = () => {
  // const env = "http://localhost:5002";
  // const env = 'https://beta.engageraise.com';
  const env = 'https://secure.engageraise.com';


  // U2FsdGVkX1/6UlkmTbFHBTztOpq89xZIq+FW/plK8o/2gj4Nvz0HUXBlCVGDsl+QbVU/e5x8xHabjx3vAyPnaSE3fG+BYoMakI3WY+jPEhU=
  const [email, setEmail] = useState("umarmaqbool37@gmail.com");

  const handleRedirectWithApi = async () => {
    let xApiKey = "",
      tokenUrl = "",
      actionPageUrl = "";
    if (env === "http://localhost:5002") {
      xApiKey =
        "U2FsdGVkX1+BA98Q11fyRlFy6AhETlatjIEMoj0JpbJbsj8WqlONDr4axaqRFZR3";
      tokenUrl = "http://localhost:5002/v1/auth/generate_session_token";
      actionPageUrl = 'http://localhost:3000/donate/client-action-page-test';
    } else if(env === 'https://beta.engageraise.com') {
      xApiKey =
        "U2FsdGVkX19XUJ8rCVkI+tv1bmmaTGXlB0OZXgTOF5hVw/GNKOG8ezLEvIPZGfnVApvbakj9FFpx7yZA7xiG2g==";
      tokenUrl =
        "https://api.beta.engageraise.com/v1/auth/generate_session_token";
      actionPageUrl = `${env}/donate/test-action-page-1`;
    } else {
      xApiKey =
      "U2FsdGVkX1/6UlkmTbFHBTztOpq89xZIq+FW/plK8o/2gj4Nvz0HUXBlCVGDsl+QbVU/e5x8xHabjx3vAyPnaSE3fG+BYoMakI3WY+jPEhU=";
      tokenUrl =
        "https://api.secure.engageraise.com/v1/auth/generate_session_token";
      actionPageUrl = `${env}/donate/abe-lincoln-test`;
    }
    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "x-api-key": xApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const { token } = await response.json();
      console.log(token, "Received Token");

      window.location.href = `${actionPageUrl}?token=${token}`;
    } catch (error) {
      console.error("Error during token retrieval or redirection:", error);
    }
  };

  return (
    <div>
      <h4>
        Enter an email and password to manually create a new user and retrieve a
        session token
      </h4>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleRedirectWithApi}>Redirect with Token</button>
    </div>
  );
};

export default App;
