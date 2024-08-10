import { useEffect, useRef, useState, RefObject, useCallback, memo } from 'react';
import NavButton from './navButton';
import NB from './navigatorBar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

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
    const isMobile = useSelector((state:RootState) => state.device.value);
    const fontSize = useSelector((state:RootState) => state.fontSize.value);
    console.log(fontSize);
    const isScrolling = useRef(true);
    const percentPast = useRef<number>(0);
    // console.log('hello from NavBar', isMobile, fontSize);
  

    const clicked = useCallback((num:number)=>{
        // console.log('clicked');
        if(contentRef && contentRef.current && scrollTrackOuterRef && scrollTrackOuterRef.current){
            // find display
            let widthDisplay = (contentRef.current.scrollHeight - scrollTrackOuterRef.current.clientHeight);
            let heightDisplay = ((contentRef.current.scrollHeight - (contentRef.current.clientHeight * 0.154)) -  scrollTrackOuterRef.current.clientHeight);
            const display = isMobile ? heightDisplay : widthDisplay;

            let current = (num / 4) * display;

            // document.documentElement.scrollTop = current;
            contentRef.current.scrollTo({
                top: current,
                behavior: 'smooth'
            });
        }
    }, [contentRef, scrollTrackOuterRef, isMobile]);

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

    const handleThumbPositionOnScroll = useCallback(() => {
        if (!contentRef.current || !scrollTrackInnerRef.current || !scrollThumbRef.current) {
          return;
        }

        const store = { contentTop : contentRef.current.scrollTop,
                        contentHeight : contentRef.current.scrollHeight, 
                        clientWidth : contentRef.current.clientWidth,
                        clientHeight : contentRef.current.clientHeight, 
                        trackWidth : scrollTrackInnerRef.current.clientWidth, 
                        thumbWidth : scrollThumbRef.current.clientWidth};
        if (isConsistent(store) && isScrolling.current) {

            // find the percent of tip/ (content - visible content)
            // const contentheight = isMobile ? store.contentHeight : store.contentHeight;
            percentPast.current = ((store.contentTop)  / (store.contentHeight - store.clientHeight));

            // obtain width of track - thumb 
            const trackWidthRem = (store.trackWidth - store.thumbWidth) / fontSize;

            // find new left
            const newLeft = (percentPast.current * trackWidthRem);
            scrollThumbRef.current.style.left = newLeft + "rem";
        } else if (!isScrolling.current) {
            isScrolling.current = true;
        } else {
            console.log("handleThumbPosition problems with numeric elems!");
        }
      }, [contentRef, scrollTrackInnerRef, scrollThumbRef, fontSize, isScrolling]);

    const handleThumbPositionOnFontSizeChange = useCallback(() => {
        //console.log("handleThumbPositionOnFontSizeChange");
        if (!contentRef.current) {
            return;
        }

        isScrolling.current = false;
        contentRef.current.scrollTop = (contentRef.current.scrollHeight - contentRef.current.clientHeight) * percentPast.current;
    }, [fontSize, scrollTrackInnerRef, contentRef]);

    const handleThumbPositionOnResize = useCallback(() => {
        console.log("handleThumbPositionOnResize");
        if (!scrollTrackInnerRef.current || !scrollThumbRef.current) {
            return;
        }
        const trackWidthRem = (scrollTrackInnerRef.current.clientWidth - scrollThumbRef.current.clientWidth) / fontSize;
        console.log(scrollTrackInnerRef.current.clientWidth, scrollThumbRef.current.clientWidth, fontSize)
        const newLeft = (percentPast.current * trackWidthRem);
        scrollThumbRef.current.style.left = newLeft + "rem";
        console.log(newLeft, percentPast.current)
    }, [scrollTrackInnerRef, scrollThumbRef, fontSize]);

    useEffect (() => {
        handleThumbPositionOnFontSizeChange();
        contentRef.current?.addEventListener('scroll', handleThumbPositionOnScroll);

        return () => {
            contentRef.current?.removeEventListener('scroll', handleThumbPositionOnScroll);
        };

    }, [fontSize]);

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
            
            console.log(newScrollTop, contentRef.current.scrollTop);
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