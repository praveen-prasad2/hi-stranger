import { Fragment } from "react";

/**
 * Renders "\n" as line breaks. Single breaks relax on small phones
 * (so authored lines don't wrap awkwardly); blank lines always break.
 */
export function Lines({ text, keepBreaks = false }: { text: string; keepBreaks?: boolean }) {
  const paragraphs = text.split("\n\n");
  return (
    <>
      {paragraphs.map((para, p) => (
        <Fragment key={p}>
          {p > 0 && (
            <>
              <br />
              <span className="block h-[0.6em]" aria-hidden />
            </>
          )}
          {para.split("\n").map((line, i) => (
            <Fragment key={i}>
              {i > 0 && (keepBreaks ? <br /> : <><br className="max-sm:hidden" /><span className="sm:hidden"> </span></>)}
              {line}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </>
  );
}
