import React from "react";
import "./header.css";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";

function Header() {
  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header_content">
        <h1 className="gradient__text">
          Lets Build Something Amazing with GPT-3 OpenAI
        </h1>
        <p>
          Yet bed any for travelling assistance indulgence unpleasing. Not
          thoughts all exervise blessing. Indulgence way everything joy
          alteration boisterous the attachment. Party we years to order allow
          asked of.
        </p>
        <div className="gpt3__header_content-input">
          <input type="email" placeholder="Your Email Address" />
          <button type="button">Get Started</button>
        </div>
        <div className="gpt3__header-content__people">
          <img src={people} alt="people" />
          <p>1,600 people request access a visit in last 24 hours</p>
        </div>
        <div className="gpt3__header-image">
          <img src={ai} alt="ai" />
        </div>
      </div>
    </div>
  );
}

export default Header;
