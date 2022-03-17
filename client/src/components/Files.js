import React, { useState } from "react";
import FileUploader from "./FileUploader";

export default function Files(props) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <div
        className="main-wrapper"
    >
      <h3>5. File Upload</h3>
      <div className="input-wrapper">
        <span>
          IMPORTANT: Attach all your Academic certificates here(Combine all
          certificates in one PDF document)
        </span>
        <FileUploader applicantId={props.applicantId} setUploaded={setUploaded}/>
      </div>
      <div className="button-wrapper">
        {uploaded ? (
          <button onClick={props.setDone(true)}>Submit</button>
        ) : null}
      </div>
    </div>
  );
}
