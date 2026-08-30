import { useCampaign } from "../../context/CampaignContext";
import type { BoxTextStyle, ButtonStyle, OptionStyle } from "../../types/campaign";
import { ColorField, Field, NumberField, RadiusEditor, Section, SpacingEditor, TextStyleEditor, Toggle } from "../ui/Controls";

function BoxStyleEditor({ value, onChange }: { value: BoxTextStyle; onChange: (v: BoxTextStyle)=>void }) {
  return (
    <>
      <TextStyleEditor value={value} onChange={(v)=>onChange({...value,...v})}/>
      <div className="grid-3">
        <ColorField label="Border" value={value.borderColor} onChange={(v)=>onChange({...value,borderColor:v})}/>
        <ColorField label="Background" value={value.backgroundColor} onChange={(v)=>onChange({...value,backgroundColor:v})}/>
        <NumberField label="Border width" value={value.borderWidth} onChange={(v)=>onChange({...value,borderWidth:v})}/>
      </div>
    </>
  );
}

function OptionBoxEditor({ value, onChange }: { value: OptionStyle; onChange: (v: OptionStyle)=>void }) {
  return (
    <BoxStyleEditor value={value} onChange={(v)=>onChange({...value,...v})}/>
  )
}

function ButtonEditor({ value, onChange }: { value: ButtonStyle; onChange: (v: ButtonStyle)=>void }) {
  return (
    <>
      <div className="inline-setting">
        <strong>Occupy Full Width</strong>
        <Toggle checked={value.fullWidth} onChange={(v)=>onChange({...value,fullWidth:v})}/>
      </div>
      <BoxStyleEditor value={value} onChange={(v)=>onChange({...value,...v})}/>
      <div className="grid-2">
        <NumberField label="Height" value={value.height} onChange={(v)=>onChange({...value,height:v})}/>
        <NumberField label="Width" value={value.width} onChange={(v)=>onChange({...value,width:v})}/>
      </div>
      <div className="subheading">Corner Radius</div>
      <RadiusEditor value={value.radius} onChange={(v)=>onChange({...value,radius:v})}/>
    </>
  )
}

export default function StylingEditor() {
  const { campaign, update } = useCampaign();
  const s = campaign.styling;

  const set = <K extends keyof typeof s>(key: K, value: (typeof s)[K]) =>
    update((d)=>{ d.styling[key] = value; return d; });

  return (
    <div className="editor-stack">
      <Section title="Appearance">
        <div className="grid-2">
          <ColorField label="Background Color" value={s.appearance.backgroundColor} onChange={(v)=>set("appearance",{...s.appearance,backgroundColor:v})}/>
          <ColorField label="Backdrop Color" value={s.appearance.backdropColor} onChange={(v)=>set("appearance",{...s.appearance,backdropColor:v})}/>
          <NumberField label="Delay (seconds)" value={s.appearance.delaySeconds} onChange={(v)=>set("appearance",{...s.appearance,delaySeconds:v})}/>
          <NumberField label="Backdrop Opacity" value={s.appearance.backdropOpacity} min={0} max={1} step={0.05} onChange={(v)=>set("appearance",{...s.appearance,backdropOpacity:v})}/>
        </div>
        <div className="subheading">Popup Corner Radius</div>
        <RadiusEditor value={s.appearance.radius} onChange={(v)=>set("appearance",{...s.appearance,radius:v})}/>
      </Section>

      <Section title="Question Title Styling">
        <TextStyleEditor value={s.questionTitle} onChange={(v)=>set("questionTitle",v)}/>
      </Section>

      <Section title="Subtitle Styling">
        <TextStyleEditor value={s.subtitle} onChange={(v)=>set("subtitle",v)}/>
      </Section>

      <Section title="Option List Style">
        <div className="grid-2">
          <Field label="Option Layout">
            <select value={s.options.layout} onChange={(e)=>set("options",{...s.options,layout:e.target.value as typeof s.options.layout})}>
              <option value="radio">Radio Style</option>
              <option value="checkbox">Checkbox Style</option>
              <option value="filled">Filled Option</option>
              <option value="alternative">Alternative Layout</option>
            </select>
          </Field>
          <NumberField label="Option Height" value={s.options.optionHeight} onChange={(v)=>set("options",{...s.options,optionHeight:v})}/>
          <NumberField label="Bullet Spacing" value={s.options.bulletSpacing} onChange={(v)=>set("options",{...s.options,bulletSpacing:v})}/>
          <NumberField label="Option Spacing" value={s.options.optionSpacing} onChange={(v)=>set("options",{...s.options,optionSpacing:v})}/>
        </div>
        <div className="subheading">Option Radius</div>
        <RadiusEditor value={s.options.radius} onChange={(v)=>set("options",{...s.options,radius:v})}/>
      </Section>

      <Section title="Selected Option Styling">
        <OptionBoxEditor value={s.options.selected} onChange={(v)=>set("options",{...s.options,selected:v})}/>
      </Section>

      <Section title="Unselected Option Styling">
        <OptionBoxEditor value={s.options.unselected} onChange={(v)=>set("options",{...s.options,unselected:v})}/>
      </Section>

      <Section title="Additional Comment Styling">
        <BoxStyleEditor value={s.comments} onChange={(v)=>set("comments",v)}/>
      </Section>

      <Section title="CTA Button Styling">
        <ButtonEditor value={s.ctaButton} onChange={(v)=>set("ctaButton",v)}/>
      </Section>

      <Section title="Cross Button Styling">
        <div className="inline-setting">
          <strong>Enable Cross Button</strong>
          <Toggle checked={s.crossButton.enabled} onChange={(v)=>set("crossButton",{...s.crossButton,enabled:v})}/>
        </div>
        <div className="grid-2">
          <Field label="Style">
            <select value={s.crossButton.style} onChange={(e)=>set("crossButton",{...s.crossButton,style:e.target.value as typeof s.crossButton.style})}>
              <option value="simple">Simple</option><option value="circle">Circle</option><option value="square">Square</option>
            </select>
          </Field>
          <NumberField label="Size" value={s.crossButton.size} onChange={(v)=>set("crossButton",{...s.crossButton,size:v})}/>
          <ColorField label="Cross Color" value={s.crossButton.crossColor} onChange={(v)=>set("crossButton",{...s.crossButton,crossColor:v})}/>
          <ColorField label="Fill Color" value={s.crossButton.fillColor} onChange={(v)=>set("crossButton",{...s.crossButton,fillColor:v})}/>
          <ColorField label="Stroke Color" value={s.crossButton.strokeColor} onChange={(v)=>set("crossButton",{...s.crossButton,strokeColor:v})}/>
        </div>
        <Field label="Upload Custom Cross Icon">
          <input type="file" accept="image/*" onChange={(e)=>{
            const f=e.target.files?.[0]; if(!f)return;
            set("crossButton",{...s.crossButton,customIconUrl:URL.createObjectURL(f)})
          }}/>
        </Field>
        <div className="subheading">Margins</div>
        <SpacingEditor value={s.crossButton.margin} onChange={(v)=>set("crossButton",{...s.crossButton,margin:v})}/>
      </Section>

      <Section title="Thank You Page Styling">
        <div className="subheading">Title</div>
        <TextStyleEditor value={s.thankYou.title} onChange={(v)=>set("thankYou",{...s.thankYou,title:v})}/>
        <div className="subheading">Subtitle</div>
        <TextStyleEditor value={s.thankYou.subtitle} onChange={(v)=>set("thankYou",{...s.thankYou,subtitle:v})}/>
        <div className="subheading">Image</div>
        <div className="grid-2">
          <NumberField label="Width" value={s.thankYou.imageWidth} onChange={(v)=>set("thankYou",{...s.thankYou,imageWidth:v})}/>
          <NumberField label="Height" value={s.thankYou.imageHeight} onChange={(v)=>set("thankYou",{...s.thankYou,imageHeight:v})}/>
        </div>
        <SpacingEditor value={s.thankYou.imageMargin} onChange={(v)=>set("thankYou",{...s.thankYou,imageMargin:v})}/>
        <div className="subheading">Thank You Button</div>
        <ButtonEditor value={s.thankYou.button} onChange={(v)=>set("thankYou",{...s.thankYou,button:v})}/>
      </Section>
    </div>
  );
}
