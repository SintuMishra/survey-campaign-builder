import { useState } from "react";
import ContentEditor from "../content/ContentEditor";
import StylingEditor from "../styling/StylingEditor";
import MobilePreview from "../preview/MobilePreview";

export default function BuilderLayout() {
  const [tab,setTab]=useState<"content"|"styling">("content");

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <div className="brand-mark">SC</div>
          <div>
            <h1>Survey Campaign Builder</h1>
            <p>Configure content and styling with a live preview.</p>
          </div>
        </div>
      </header>

      <main className="builder-grid">
        <section className="builder-panel">
          <div className="tabs">
            <button type="button" aria-pressed={tab==="content"} className={tab==="content"?"active":""} onClick={()=>setTab("content")}>Content</button>
            <button type="button" aria-pressed={tab==="styling"} className={tab==="styling"?"active":""} onClick={()=>setTab("styling")}>Styling</button>
          </div>
          <div className="panel-scroll">
            {tab==="content" ? <ContentEditor/> : <StylingEditor/>}
          </div>
        </section>

        <MobilePreview/>
      </main>
    </div>
  );
}
