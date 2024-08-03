import { useEffect, useRef, useState, RefObject, useCallback, memo } from 'react'
import NavButton from './navButton'
import NB from './navigatorBar.module.css'

interface Store {
    contentTop : string|number;
    contentHeight : string|number; 
    trackWidth : string|number; 
    thumbWidth : string|number;
    clientWidth : string|number,
    clientHeight : string|number
}

const numberOfSections = 4;

const NavigatorBar = memo(({contentRef} : {contentRef : RefObject<HTMLDivElement>}) =>{
    const scrollThumbRef = useRef<HTMLDivElement|null>(null);
    const scrollTrackOuterRef = useRef<HTMLDivElement|null>(null);
    const scrollTrackInnerRef = useRef<HTMLDivElement|null>(null);
    const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
    const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);
  

    const clicked = (num:number)=>{
        // console.log('clicked');
        if(contentRef && contentRef.current && scrollTrackOuterRef && scrollTrackOuterRef.current){
            // find device is heightBased -> mobile 
            const isHeightBased = (contentRef.current.clientHeight / contentRef.current.clientWidth) > 1;

            // find display
            let widthDisplay = (contentRef.current.scrollHeight - scrollTrackOuterRef.current.clientHeight);
            let heightDisplay = ((contentRef.current.scrollHeight - (contentRef.current.clientHeight * 0.154)) -  scrollTrackOuterRef.current.clientHeight);
            const display = isHeightBased ? heightDisplay : widthDisplay;

            let current = (num / 4) * display;

            // document.documentElement.scrollTop = current;
            contentRef.current.scrollTo({
                top: current,
                behavior: 'smooth'
            });
        }
    }

    const isConsistent = useCallback((store : Store) => {
        // console.log('isConsistent');
        for (const key of Object.keys(store) as Array<keyof Store>) {
            if (+store[key] !== 0 && !+store[key]) {
                return false;
            } else {
                store[key] = +store[key];
            }
        }
        return true;
    }, [])

    const handleThumbPosition = useCallback(() => {
        // console.log('handleThumbPosition');
        if (!contentRef.current || !scrollTrackInnerRef.current || !scrollThumbRef.current) {
          return;
        }

        const store = { contentTop : contentRef.current.scrollTop,
                        contentHeight : contentRef.current.scrollHeight, 
                        clientWidth : contentRef.current.clientWidth,
                        clientHeight : contentRef.current.clientHeight, 
                        trackWidth : scrollTrackInnerRef.current.clientWidth, 
                        thumbWidth : scrollThumbRef.current.clientWidth};
        if (isConsistent(store)) {
            // find font size
            const el = document.documentElement;
            const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
            const fontSize = parseFloat(style);
            console.log(fontSize);

            // find the percent of tip/ (content - visible content)
            // const contentheight = isHeightBased ? store.contentHeight : store.contentHeight;
            const percent = ((store.contentTop)  / (store.contentHeight - store.clientHeight));

            // obtain width of track - thumb 
            const trackWidthRem = (store.trackWidth - store.thumbWidth) / fontSize;

            // find new left
            const newLeft = (percent * trackWidthRem);
            scrollThumbRef.current.style.left = newLeft + "rem";
        } else {
            console.log("handleThumbPosition problems with numeric elems!");
        }
      }, [contentRef, scrollTrackInnerRef, scrollThumbRef]);

    useEffect (() => {
        contentRef.current?.addEventListener('scroll', handleThumbPosition);

        return () => {
            contentRef.current?.removeEventListener('scroll', handleThumbPosition);
        };

    }, []);

    const handleThumbMousedown = useCallback((e:any) => {
        // console.log('handleThumbMousedown');
        e.preventDefault();
        e.stopPropagation();
        if (contentRef.current) {
            setScrollStartPosition(e.clientX);
            setInitialScrollTop(contentRef.current.scrollTop);
            setIsDragging(true);
        };
    }, []);

    const handleThumbMouseup = useCallback((e:any) => {
        // console.log('handleThumbMouseup');
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
            setIsDragging(false);
        }
    }, [isDragging]);
    
    const handleThumbMousemove = useCallback((e:any) => {
        // console.log('handleThumbMousemove');
        e.preventDefault();
        e.stopPropagation();
        if (isDragging && contentRef.current && scrollTrackInnerRef.current && scrollTrackOuterRef.current && scrollStartPosition !== null) {
            const {scrollHeight: contentScrollHeight, offsetHeight: contentOffsetHeight} = contentRef.current;
            const {clientWidth : trackWidth} = scrollTrackInnerRef.current;
            const {clientHeight : trackheight} = scrollTrackOuterRef.current;
            const deltaY = (e.clientX - scrollStartPosition) * ((contentScrollHeight - numberOfSections * trackheight) / trackWidth);
            const newScrollTop = Math.min(initialScrollTop + deltaY, contentScrollHeight - contentOffsetHeight);
            contentRef.current.scrollTop = newScrollTop;
        }
        }, [isDragging, scrollStartPosition]);


    // Listen for mouse events to handle scrolling by dragging the thumb
    useEffect(() => {
        document.addEventListener('mousemove', handleThumbMousemove);
        document.addEventListener('mouseup', handleThumbMouseup);
        document.addEventListener('mouseleave', handleThumbMouseup);
        return () => {
            document.removeEventListener('mousemove', handleThumbMousemove);
            document.removeEventListener('mouseup', handleThumbMouseup);
            document.removeEventListener('mouseleave', handleThumbMouseup);
        };
    }, [handleThumbMousemove, handleThumbMouseup]);

    return (
        <div  ref= {scrollTrackOuterRef} className={NB.main}>
            <div className={NB.outer}>
                <div ref={scrollTrackInnerRef} className={NB.inner} >
                    <NavButton title={"About me"} clicked = {clicked} num={0}/>
                    <NavButton title={"Skills"} clicked = {clicked} num={1}/>
                    <NavButton title={"Journey"} clicked = {clicked} num={2}/>
                    <NavButton title={"Projects"} clicked = {clicked} num={3}/>
                    <div ref={scrollThumbRef} className={NB.line}>
                        <div onMouseDown={handleThumbMousedown} className={NB.noHover}>
                            <div onMouseDown={handleThumbMousedown} className={NB.track}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

})

export default NavigatorBar