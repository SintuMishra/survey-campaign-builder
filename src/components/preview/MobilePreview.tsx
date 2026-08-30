import { useEffect, useState } from "react";
import { useCampaign } from "../../context/CampaignContext";
import type { ButtonStyle } from "../../types/campaign";
import { radiusCss, spacingCss, textCss } from "../../utils/styleUtils";
import LottiePreview from "./LottiePreview";

export default function MobilePreview() {
  const { campaign } = useCampaign();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<Record<number, string[]>>({});
  const [showThankYou, setShowThankYou] = useState(false);
  const [visible, setVisible] = useState(true);

  const { content, styling } = campaign;
  const q = content.questions[current];

  useEffect(() => {
    if (current > content.questions.length - 1) setCurrent(Math.max(0, content.questions.length - 1));
  }, [content.questions.length, current]);

  const restart = () => {
    setVisible(false);
    setShowThankYou(false);
    setCurrent(0);
    setSelected({});
    window.setTimeout(()=>setVisible(true), Math.max(0, styling.appearance.delaySeconds) * 1000);
  };

  const choose = (optionId: string) => {
    const mode = styling.options.layout;
    setSelected(prev => {
      const existing = prev[current] ?? [];
      const values = mode === "checkbox"
        ? existing.includes(optionId) ? existing.filter(x=>x!==optionId) : [...existing, optionId]
        : [optionId];
      return {...prev,[current]:values};
    });
  };

  const next = () => {
    const selectedId = (selected[current] ?? [])[0];
    const condition = q.conditions.find(c=>c.optionId===selectedId);
    if (condition) {
      if (condition.redirectTo==="thank-you" && content.thankYou.enabled) { setShowThankYou(true); return; }
      const idx=Number(condition.redirectTo.replace("question-",""));
      if (!Number.isNaN(idx) && idx>=0 && idx<content.questions.length) { setCurrent(idx); return; }
    }

    if (current < content.questions.length - 1) setCurrent(current + 1);
    else if (content.thankYou.enabled) setShowThankYou(true);
    else setVisible(false);
  };

  const backdrop = {
    backgroundColor: hexToRgba(styling.appearance.backdropColor, styling.appearance.backdropOpacity)
  };

  return (
    <aside className="preview-column">
      <div className="preview-toolbar">
        <strong>Mobile preview</strong>
        <button type="button" className="secondary-btn compact" onClick={restart}>Restart Preview</button>
      </div>
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen" style={backdrop}>
          {visible && (
            <div className="survey-popup" style={{ backgroundColor: styling.appearance.backgroundColor, ...radiusCss(styling.appearance.radius) }}>
              {styling.crossButton.enabled && (
                <button
                  type="button"
                  aria-label="Close survey preview"
                  className={`preview-cross ${styling.crossButton.style}`}
                  onClick={()=>setVisible(false)}
                  style={{
                    color:styling.crossButton.crossColor,
                    background:styling.crossButton.style==="simple"?"transparent":styling.crossButton.fillColor,
                    borderColor:styling.crossButton.strokeColor,
                    width:styling.crossButton.size,
                    height:styling.crossButton.size,
                    top:styling.crossButton.margin.top - styling.crossButton.margin.bottom,
                    right:styling.crossButton.margin.right - styling.crossButton.margin.left
                  }}
                >
                  {styling.crossButton.customIconUrl
                    ? <img src={styling.crossButton.customIconUrl} alt="close"/>
                    : "×"}
                </button>
              )}

              {showThankYou ? (
                <div className="thankyou-preview">
                  {content.thankYou.mediaUrl && !content.thankYou.mediaName.toLowerCase().endsWith(".json") && (
                    <img
                      src={content.thankYou.mediaUrl}
                      alt={content.thankYou.mediaName}
                      style={{
                        width:styling.thankYou.imageWidth,
                        height:styling.thankYou.imageHeight,
                        objectFit:"cover",
                        ...spacingCss(styling.thankYou.imageMargin)
                      }}
                    />
                  )}
                  {content.thankYou.mediaUrl && content.thankYou.mediaName.toLowerCase().endsWith(".json") && (
                    <div style={spacingCss(styling.thankYou.imageMargin)}>
                      <LottiePreview
                        src={content.thankYou.mediaUrl}
                        width={styling.thankYou.imageWidth}
                        height={styling.thankYou.imageHeight}
                        label={content.thankYou.mediaName || "Thank you animation"}
                      />
                    </div>
                  )}
                  <h2 style={textCss(styling.thankYou.title)}>{content.thankYou.title}</h2>
                  <p style={textCss(styling.thankYou.subtitle)}>{content.thankYou.subtitle}</p>
                  <button
                    type="button"
                    onClick={()=>{
                      if(content.thankYou.redirectType==="url" && content.thankYou.redirectValue) window.open(content.thankYou.redirectValue,"_blank")
                    }}
                    style={buttonCss(styling.thankYou.button)}
                  >
                    {content.thankYou.buttonText}
                  </button>
                </div>
              ) : (
                <>
                  <div className="progress-text">Question {current+1} of {content.questions.length}</div>
                  <h2 style={textCss(styling.questionTitle)}>{q.title}</h2>
                  <p style={textCss(styling.subtitle)}>{q.subtitle}</p>

                  <div style={{display:"grid",gap:styling.options.optionSpacing}}>
                    {q.options.map(option=>{
                      const active=(selected[current] ?? []).includes(option.id);
                      const os=active ? styling.options.selected : styling.options.unselected;
                      return (
                        <button
                          type="button"
                          key={option.id}
                          className={`preview-option ${styling.options.layout}`}
                          onClick={()=>choose(option.id)}
                          aria-pressed={active}
                          style={{
                            color:os.color,
                            backgroundColor:os.backgroundColor,
                            border:`${os.borderWidth}px solid ${os.borderColor}`,
                            minHeight:styling.options.optionHeight,
                            fontFamily:os.fontFamily,
                            fontSize:os.fontSize,
                            fontWeight:os.bold?700:os.fontWeight,
                            fontStyle:os.italic?"italic":"normal",
                            textDecoration:os.underline?"underline":"none",
                            textAlign:os.alignment,
                            ...spacingCss(os.margin),
                            ...radiusCss(styling.options.radius),
                          }}
                        >
                          <span className="option-content">
                            <span className="bullet" aria-hidden="true" style={{marginRight:styling.options.bulletSpacing}}>
                              {styling.options.layout === "checkbox" ? (active ? "✓" : "") : (active ? "●" : "")}
                            </span>
                            <span>{option.label}</span>
                          </span>
                          {styling.options.layout === "alternative" && <span aria-hidden="true">{active ? "✓" : "→"}</span>}
                        </button>
                      )
                    })}
                  </div>

                  {q.additionalComments && (
                    <textarea
                      className="preview-comment"
                      placeholder="Additional comments"
                      style={{
                        color:styling.comments.color,
                        background:styling.comments.backgroundColor,
                        border:`${styling.comments.borderWidth}px solid ${styling.comments.borderColor}`,
                        fontFamily:styling.comments.fontFamily,
                        fontSize:styling.comments.fontSize,
                        fontWeight:styling.comments.bold?700:styling.comments.fontWeight,
                        fontStyle:styling.comments.italic?"italic":"normal",
                        textDecoration:styling.comments.underline?"underline":"none",
                        textAlign:styling.comments.alignment,
                        ...spacingCss(styling.comments.margin)
                      }}
                    />
                  )}

                  <button type="button" style={buttonCss(styling.ctaButton)} onClick={next}>
                    {q.submitButtonText || (current===content.questions.length-1?"Submit":"Next")}
                  </button>
                </>
              )}
            </div>
          )}
          {!visible && <button type="button" className="reopen-button" onClick={()=>setVisible(true)}>Open survey</button>}
        </div>
      </div>
    </aside>
  );
}

function hexToRgba(hex: string, opacity: number) {
  const clean = hex.replace("#","");
  if (clean.length!==6) return `rgba(17,24,39,${opacity})`;
  const r=parseInt(clean.slice(0,2),16), g=parseInt(clean.slice(2,4),16), b=parseInt(clean.slice(4,6),16);
  return `rgba(${r},${g},${b},${opacity})`;
}

function buttonCss(s: ButtonStyle) {
  return {
    color:s.color,
    backgroundColor:s.backgroundColor,
    border:`${s.borderWidth}px solid ${s.borderColor}`,
    height:s.height,
    width:s.fullWidth?"100%":s.width,
    fontFamily:s.fontFamily,
    fontSize:s.fontSize,
    fontWeight:s.bold?700:s.fontWeight,
    fontStyle:s.italic?"italic":"normal",
    textDecoration:s.underline?"underline":"none",
    textAlign:s.alignment,
    cursor:"pointer",
    ...radiusCss(s.radius),
    ...spacingCss(s.margin),
  }
}
