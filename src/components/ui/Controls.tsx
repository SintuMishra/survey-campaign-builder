import type { ReactNode } from "react";
import type { Alignment, Radius, Spacing, TextStyle } from "../../types/campaign";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={checked ? "Disable" : "Enable"} className={`toggle ${checked ? "on" : ""}`} onClick={() => onChange(!checked)}>
      <span />
    </button>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="section-card" open>
      <summary>{title}</summary>
      <div className="section-body">{children}</div>
    </details>
  );
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <div className="color-row">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </Field>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <Field label={label}>
      <input type="number" value={value} min={min} max={max} step={step} onChange={(e) => onChange(Number(e.target.value))} />
    </Field>
  );
}

export function RadiusEditor({ value, onChange }: { value: Radius; onChange: (v: Radius) => void }) {
  const keys: [keyof Radius, string][] = [["topLeft","TL"],["topRight","TR"],["bottomLeft","BL"],["bottomRight","BR"]];
  return (
    <div className="grid-4">
      {keys.map(([k,l]) => <NumberField key={k} label={l} value={value[k]} onChange={(n)=>onChange({...value,[k]:n})} />)}
    </div>
  );
}

export function SpacingEditor({ value, onChange }: { value: Spacing; onChange: (v: Spacing) => void }) {
  const keys: [keyof Spacing, string][] = [["top","Top"],["right","Right"],["bottom","Bottom"],["left","Left"]];
  return (
    <div className="grid-4">
      {keys.map(([k,l]) => <NumberField key={k} label={l} value={value[k]} onChange={(n)=>onChange({...value,[k]:n})} />)}
    </div>
  );
}

export function TextStyleEditor({ value, onChange }: { value: TextStyle; onChange: (v: TextStyle) => void }) {
  return (
    <>
      <div className="grid-2">
        <ColorField label="Color" value={value.color} onChange={(v)=>onChange({...value,color:v})}/>
        <Field label="Font family">
          <select value={value.fontFamily} onChange={(e)=>onChange({...value,fontFamily:e.target.value})}>
            <option>Inter, system-ui, sans-serif</option>
            <option>Arial, sans-serif</option>
            <option>Georgia, serif</option>
            <option>Courier New, monospace</option>
          </select>
        </Field>
        <NumberField label="Font size" value={value.fontSize} onChange={(v)=>onChange({...value,fontSize:v})}/>
        <Field label="Font weight">
          <select value={value.fontWeight} onChange={(e)=>onChange({...value,fontWeight:Number(e.target.value)})}>
            <option value={400}>400</option><option value={500}>500</option><option value={600}>600</option><option value={700}>700</option><option value={800}>800</option>
          </select>
        </Field>
      </div>
      <div className="button-group">
        <button type="button" aria-pressed={value.bold} aria-label="Bold" className={value.bold ? "active":""} onClick={()=>onChange({...value,bold:!value.bold})}>B</button>
        <button type="button" aria-pressed={value.italic} aria-label="Italic" className={value.italic ? "active":""} onClick={()=>onChange({...value,italic:!value.italic})}><i>I</i></button>
        <button type="button" aria-pressed={value.underline} aria-label="Underline" className={value.underline ? "active":""} onClick={()=>onChange({...value,underline:!value.underline})}><u>U</u></button>
        {(["left","center","right"] as Alignment[]).map(a => <button type="button" aria-pressed={value.alignment===a} key={a} className={value.alignment===a?"active":""} onClick={()=>onChange({...value,alignment:a})}>{a}</button>)}
      </div>
      <div className="subheading">Margins</div>
      <SpacingEditor value={value.margin} onChange={(margin)=>onChange({...value,margin})}/>
    </>
  );
}
