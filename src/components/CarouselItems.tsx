import { ReactNode, RefObject } from "react";
import { useRef } from "react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useMediaQuery } from "react-responsive";

interface SectionItemsProps {
  title: string;
  children: ReactNode;
}

export function CarouselItems({ title, children }: SectionItemsProps) {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const carousel: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const scrollAmount = 150;

  const handleScrollForward = () => {
    if (carousel.current) {
      carousel.current.scrollLeft += scrollAmount;
    }
  };

  const handleScrollBackward = () => {
    if (carousel.current) {
      carousel.current.scrollLeft -= scrollAmount;
    }
  };

  return (
    <section>
      <p className="text-white-300 font-Poppins font-medium text-xs mb-6">
        {title}
      </p>

      <div className="relative">
        <button
          className={`${
            isDesktop ? "absolute" : "hidden"
          } text-white-100 mt-[210px] ml-10`}
          onClick={handleScrollBackward}
        >
          {<CaretLeft size={35} />}
        </button>

        <button
          className={`${
            isDesktop ? "absolute" : "hidden"
          } text-white-100 mt-[210px] right-0 mr-10`}
          onClick={handleScrollForward}
        >
          {<CaretRight size={35} />}
        </button>

        <div
          className="cursor-grab overflow-x-scroll scroll-smooth scrollbar scrollbar-track-transparent "
          ref={carousel}
        >
          <div className="flex gap-4">{children}</div>
        </div>
      </div>
    </section>
  );
}
