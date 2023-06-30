import { ReactNode, RefObject } from "react";
import { useRef } from "react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useMediaQuery } from "react-responsive";

interface SectionItemsProps {
  title: string;
  children: ReactNode;
}

export function CarouselItems(props: SectionItemsProps) {
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
    <div>
      <p className="text-white-300 font-Poppins font-medium text-xs mb-6">
        {props.title}
      </p>

      <div className="relative">
        <div>
          <button
            className={`${
              isDesktop ? "absolute" : "hidden"
            } text-white-100 mt-[160px] z-20`}
            onClick={handleScrollBackward}
          >
            {<CaretLeft size={35} />}
          </button>

          <button
            className={`${
              isDesktop ? "absolute" : "hidden"
            } text-white-100 mt-[160px] right-0 z-20`}
            onClick={handleScrollForward}
          >
            {<CaretRight size={35} />}
          </button>
        </div>

        <div
          className="overflow-x-scroll scroll-smooth scrollbar scrollbar-track-transparent"
          ref={carousel}
        >
          <div className="hidden lg:block pointer-events-none absolute left-0 w-[200px] min-h-[462px] z-10 bg-gradient-to-r from-dark-400 opacity-100"></div>
          <div className="hidden lg:block pointer-events-none  absolute right-0 w-[250px] min-h-[462px] z-10 bg-gradient-to-l from-dark-400 opacity-100"></div>
          <div className="flex gap-4">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
