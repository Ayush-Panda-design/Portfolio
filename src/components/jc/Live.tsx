import { PRODUCTION } from "@/data/projects";
import { Stage } from "./Stage";

export function Live() {
  const items = PRODUCTION.filter((p) => p.live && p.screenshots[0]?.src);
  return (
    <section id="live" data-scene="princes" className="jc-sec jc-stagesec">
      <Stage
        label="Live products"
        title="Built to be used, not just shown."
        variant="type"
        kind="window"
        theme="wide"
        hot="pr"
        items={items.map((p) => ({ id: p.id, num: p.num, title: p.title, tag: p.tag, img: p.screenshots[0].src, accent: "#FFD66B", url: p.live }))}
        onOpen={(it) => it.url && window.open(it.url, "_blank", "noopener")}
      />
    </section>
  );
}
