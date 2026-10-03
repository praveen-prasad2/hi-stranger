"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger, useGSAP, gsap } from "@/lib/gsap";
import { applyTone, type Tone } from "@/lib/tones";
import { AlongTheWayScene } from "./AlongTheWayScene";
import { BeginningScene } from "./BeginningScene";
import { CallbackEnding } from "./CallbackEnding";
import { CustomCursor } from "./CustomCursor";
import { EasterEgg } from "./EasterEgg";
import { FakeEnding } from "./FakeEnding";
import { FamilyReveal } from "./FamilyReveal";
import { FilmGrain } from "./FilmGrain";
import { FinalLetter } from "./FinalLetter";
import { FirstSurpriseScene } from "./FirstSurpriseScene";
import { FutureScene } from "./FutureScene";
import { IntroScene } from "./IntroScene";
import { LastLetterScene } from "./LastLetterScene";
import { Loader } from "./Loader";
import { MemoryTimeline } from "./MemoryTimeline";
import { MusicControl } from "./MusicControl";
import { NowYouUnderstand } from "./NowYouUnderstand";
import { QuoteScene } from "./QuoteScene";
import { ShirtScene } from "./ShirtScene";
import { SiblingMoments } from "./SiblingMoments";
import { SmoothScroll, useSmoothScroll } from "./SmoothScroll";

/*
 * The flow:
 *   loading → intro (dark, timed) → story (scroll) → letter (overlay)
 * The story runs: May 6 → counsellor → friend → the first surprise → the shirt
 * (opening her letter unlocks the rest) → her words → why this exists → family.
 *           → fake ending → callback → a star in the corner
 * Scrolling is only unlocked during "story".
 */
type Stage = "loading" | "intro" | "story" | "letter" | "fake" | "callback";

function Story() {
  const [stage, setStage] = useState<Stage>("loading");
  const [introMounted, setIntroMounted] = useState(true);
  const [storyMounted, setStoryMounted] = useState(false);
  const [noteOpened, setNoteOpened] = useState(false);
  const [ended, setEnded] = useState(false);
  const { lock, unlock } = useSmoothScroll();
  const mainRef = useRef<HTMLElement>(null);

  // always begin at the top, in the dark
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (stage === "story") unlock();
    else lock();
  }, [stage, lock, unlock]);

  // each scene declares a tone (data-tone); the page crossfades as you pass into it
  useGSAP(
    () => {
      if (!storyMounted) return;
      gsap.utils.toArray<HTMLElement>("[data-tone]", mainRef.current).forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && applyTone(section.dataset.tone as Tone),
        });
      });
      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(id);
    },
    { scope: mainRef, dependencies: [storyMounted, noteOpened], revertOnUpdate: true },
  );

  const onLoaded = useCallback(() => setStage("intro"), []);
  const onReveal = useCallback(() => {
    applyTone("paper", true);
    setStoryMounted(true);
    setStage("story");
  }, []);

  return (
    <>
      <FilmGrain />
      <CustomCursor />
      <MusicControl ready={stage !== "loading"} />

      <main ref={mainRef} className="relative z-10 overflow-x-clip" inert={stage !== "story"}>
        {storyMounted && (
          <>
            <BeginningScene />
            <AlongTheWayScene />
            <MemoryTimeline />
            <FirstSurpriseScene />
            <ShirtScene opened={noteOpened} onOpen={() => setNoteOpened(true)} />
            {noteOpened && (
              <>
                <QuoteScene />
                <NowYouUnderstand />
                <FamilyReveal />
                <SiblingMoments />
                <FutureScene />
                <LastLetterScene onOpen={() => setStage("letter")} />
              </>
            )}
          </>
        )}
      </main>

      {introMounted && (
        <IntroScene active={stage !== "loading"} onReveal={onReveal} onDone={() => setIntroMounted(false)} />
      )}

      {stage === "letter" && <FinalLetter onClosed={() => setStage("fake")} />}
      {stage === "fake" && <FakeEnding onNext={() => setStage("callback")} />}
      {stage === "callback" && <CallbackEnding onComplete={() => setEnded(true)} />}
      {ended && <EasterEgg />}

      {stage === "loading" && <Loader onDone={onLoaded} />}
    </>
  );
}

export default function Experience() {
  return (
    <SmoothScroll>
      <Story />
    </SmoothScroll>
  );
}
