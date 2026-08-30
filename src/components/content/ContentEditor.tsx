import { useCampaign } from "../../context/CampaignContext";
import { Field, Section, Toggle } from "../ui/Controls";

export default function ContentEditor() {
  const { campaign, update, setQuestionCount } = useCampaign();
  const questions = campaign.content.questions;
  const thankYou = campaign.content.thankYou;

  const updateQuestion = (index: number, patch: Record<string, unknown>) => {
    update((draft) => {
      Object.assign(draft.content.questions[index], patch);
      return draft;
    });
  };

  const addOption = (qIndex: number) => update((draft) => {
    const q = draft.content.questions[qIndex];
    q.options.push({ id: crypto.randomUUID(), label: `Option ${q.options.length + 1}` });
    return draft;
  });

  const removeOption = (qIndex: number, optionIndex: number) => update((draft) => {
    const q = draft.content.questions[qIndex];
    if (q.options.length > 2) {
      const [removed] = q.options.splice(optionIndex, 1);
      q.conditions = q.conditions.filter((condition) => condition.optionId !== removed.id);
    }
    return draft;
  });

  const updateOption = (qIndex: number, optionIndex: number, label: string) => update((draft) => {
    draft.content.questions[qIndex].options[optionIndex].label = label;
    return draft;
  });

  const addCondition = (qIndex: number) => update((draft) => {
    const q = draft.content.questions[qIndex];
    q.conditions.push({
      id: crypto.randomUUID(),
      optionId: q.options[0]?.id ?? "",
      redirectTo: "thank-you",
    });
    return draft;
  });

  return (
    <div className="editor-stack">
      <Section title="Introduction Page">
        <Field label="Number of survey pages / questions">
          <input
            type="number"
            min={1}
            max={20}
            value={questions.length}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          />
        </Field>
      </Section>

      {questions.map((q, qi) => (
        <Section key={q.id} title={`Question ${qi + 1}`}>
          <Field label="Question Title">
            <input value={q.title} onChange={(e) => updateQuestion(qi, { title: e.target.value })} />
          </Field>

          <Field label="Question Description">
            <textarea value={q.subtitle} onChange={(e) => updateQuestion(qi, { subtitle: e.target.value })} rows={3} />
          </Field>

          <div className="subheading">Options</div>
          <div className="option-editor-list">
            {q.options.map((option, oi) => (
              <div className="option-edit-row" key={option.id}>
                <input value={option.label} onChange={(e) => updateOption(qi, oi, e.target.value)} />
                <button type="button" className="danger-ghost" disabled={q.options.length <= 2} onClick={() => removeOption(qi, oi)}>Delete</button>
              </div>
            ))}
          </div>
          <button type="button" className="secondary-btn" onClick={() => addOption(qi)}>+ Add Option</button>

          <div className="inline-setting">
            <div>
              <strong>Additional Comments</strong>
              <small>Show a comments box in the survey preview.</small>
            </div>
            <Toggle checked={q.additionalComments} onChange={(v) => updateQuestion(qi, { additionalComments: v })} />
          </div>

          <div className="subheading row-between">
            <span>Conditional Logic</span>
            <button type="button" className="secondary-btn compact" onClick={() => addCondition(qi)}>+ Add Condition</button>
          </div>
          {q.conditions.length === 0 && <div className="empty-note">No conditions configured.</div>}
          {q.conditions.map((c, ci) => (
            <div className="condition-row" key={c.id}>
              <select
                value={c.optionId}
                onChange={(e)=>update((draft)=>{
                  draft.content.questions[qi].conditions[ci].optionId = e.target.value; return draft;
                })}
              >
                {q.options.map(o => <option key={o.id} value={o.id}>If “{o.label}”</option>)}
              </select>
              <span>redirect to</span>
              <select
                value={c.redirectTo}
                onChange={(e)=>update((draft)=>{
                  draft.content.questions[qi].conditions[ci].redirectTo = e.target.value; return draft;
                })}
              >
                <option value="thank-you">Thank You Page</option>
                {questions.map((_, idx)=>idx !== qi && <option key={idx} value={`question-${idx}`}>Question {idx+1}</option>)}
              </select>
              <button type="button" className="icon-btn" aria-label={`Remove condition ${ci + 1}`} onClick={()=>update((draft)=>{
                draft.content.questions[qi].conditions.splice(ci,1); return draft;
              })}>×</button>
            </div>
          ))}

          <Field label="Submit / Next Button Text">
            <input value={q.submitButtonText} onChange={(e)=>updateQuestion(qi,{submitButtonText:e.target.value})}/>
          </Field>
        </Section>
      ))}

      <Section title="Thank You Page">
        <div className="inline-setting">
          <div><strong>Enable Thank You Page</strong><small>Show after the last question.</small></div>
          <Toggle
            checked={thankYou.enabled}
            onChange={(v)=>update((draft)=>{draft.content.thankYou.enabled=v; return draft;})}
          />
        </div>

        {thankYou.enabled && (
          <>
            <Field label="Upload Media (PNG, JPG, JPEG, GIF, Lottie JSON)">
              <input type="file" accept=".png,.jpg,.jpeg,.gif,.json,application/json,image/png,image/jpeg,image/gif" onChange={(e)=>{
                const file=e.target.files?.[0];
                if(!file) return;
                const extension = file.name.split(".").pop()?.toLowerCase();
                if (!extension || !["png", "jpg", "jpeg", "gif", "json"].includes(extension)) return;
                const url=URL.createObjectURL(file);
                update((draft)=>{
                  draft.content.thankYou.mediaName=file.name;
                  draft.content.thankYou.mediaType=file.type;
                  draft.content.thankYou.mediaUrl=url;
                  return draft;
                })
              }}/>
            </Field>

            <Field label="Thank You Title">
              <input value={thankYou.title} onChange={(e)=>update((d)=>{d.content.thankYou.title=e.target.value;return d;})}/>
            </Field>
            <Field label="Thank You Description">
              <textarea rows={3} value={thankYou.subtitle} onChange={(e)=>update((d)=>{d.content.thankYou.subtitle=e.target.value;return d;})}/>
            </Field>
            <Field label="CTA Button Text">
              <input value={thankYou.buttonText} onChange={(e)=>update((d)=>{d.content.thankYou.buttonText=e.target.value;return d;})}/>
            </Field>
            <Field label="Redirect">
              <select value={thankYou.redirectType} onChange={(e)=>update((d)=>{d.content.thankYou.redirectType=e.target.value as "url"|"none";return d;})}>
                <option value="url">URL</option>
                <option value="none">None</option>
              </select>
            </Field>
            {thankYou.redirectType==="url" && (
              <Field label="Redirect URL">
                <input value={thankYou.redirectValue} onChange={(e)=>update((d)=>{d.content.thankYou.redirectValue=e.target.value;return d;})}/>
              </Field>
            )}
          </>
        )}
      </Section>
    </div>
  );
}
