import { Section, SectionHead } from "@/components/ui/Section";
import { EngagementModels, EngagementNote } from "@/components/EngagementModels";

export function Engagement() {
  return (
    <Section id="engagement" tone="light">
      <SectionHead
        eyebrow="Engagement"
        title="Three ways to work together"
        lede="Start small if you want to. The audit exists so you can test the working relationship on something cheap."
      />
      <div className="mt-10">
        <EngagementModels />
        <EngagementNote />
      </div>
    </Section>
  );
}
