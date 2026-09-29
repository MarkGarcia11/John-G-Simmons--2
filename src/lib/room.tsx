import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ROOMS, ACCENTS } from "./content";

type RoomState = { bg: string; accent: string; dark: boolean };

const RoomContext = createContext<{
  room: RoomState;
  setRoom: (bg: string, accent: string, dark?: boolean) => void;
}>({
  room: { bg: ROOMS.ivory, accent: ACCENTS.terracotta, dark: false },
  setRoom: () => {},
});

export function RoomProvider({ children }: { children: ReactNode }) {
  const [room, setRoomState] = useState<RoomState>({
    bg: ROOMS.ivory,
    accent: ACCENTS.terracotta,
    dark: false,
  });

  const setRoom = useMemo(
    () => (bg: string, accent: string, dark = false) => {
      setRoomState((prev) =>
        prev.bg === bg && prev.accent === accent && prev.dark === dark
          ? prev
          : { bg, accent, dark },
      );
    },
    [],
  );

  const value = useMemo(() => ({ room, setRoom }), [room, setRoom]);

  return (
    <RoomContext.Provider value={value}>
      {/* the paper: cross-fades between rooms, 600–900ms */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 transition-colors duration-[850ms]"
        style={{
          backgroundColor: room.bg,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <div className={room.dark ? "room-dark" : undefined}>{children}</div>
    </RoomContext.Provider>
  );
}

export const useRoom = () => useContext(RoomContext);

/**
 * A book-spread section: wide left margin rail + a 65ch measure.
 * Registers its own paper colour as it reaches the middle of the viewport.
 */
export function Section({
  id,
  bg,
  accent,
  dark,
  rail,
  children,
  className = "",
  bleed = false,
}: {
  id?: string;
  bg?: string;
  accent?: string;
  dark?: boolean;
  rail?: ReactNode;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { setRoom } = useRoom();

  useEffect(() => {
    if (!bg) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setRoom(bg, accent ?? ACCENTS.terracotta, dark);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [bg, accent, dark, setRoom]);

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <div
        className={
          bleed
            ? "mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12"
            : "mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-12"
        }
      >
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-x-12 xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)] xl:gap-x-16">
          <div className="lg:pt-2">{rail}</div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
