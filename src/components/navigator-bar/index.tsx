import { useEffect, useRef } from 'react'
import NavButton from './NavButton'
import NB from './NavigatorBar.module.css'
const NavigatorBar = () =>{
    let observe = useRef<HTMLDivElement>(null)

    const clicked = (num:number)=>{
        if(observe.current){
            let w =( Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 8 )/ 100;
            let display = document.documentElement.scrollHeight - w;
            let current = (num/4) * display;
            // document.documentElement.scrollTop = current;
            window.scrollTo({
                top: current,
                behavior: 'smooth'
            });
        }
    }

    useEffect (() => {
        document.documentElement.scrollTop = 0;
        console.log(document.documentElement.scrollTop);
        const checkNav = () => {
            let h : HTMLElement = document.documentElement ;
            let b : HTMLElement = document.body;
            let percent = (h.scrollTop || b.scrollTop) / ((h.scrollHeight || b.scrollHeight) - h.clientHeight);
            if ( observe.current ) {
                console.log(document.documentElement.scrollTop);
                let pos = (percent * 18.68)-0.07;
                observe.current.style.left = pos + "rem";
            }
        }

        window.addEventListener("scroll", checkNav);

        return () => {
            window.removeEventListener("scroll", checkNav);
        };
    }, [])

    return (
        <div className={NB.main}>
            <div className={NB.inner}>
                <NavButton title={"About me"} clicked = {clicked} num={0}/>
                <NavButton title={"Skills"} clicked = {clicked} num={1}/>
                <NavButton title={"Journey"} clicked = {clicked} num={2}/>
                <NavButton title={"Projects"} clicked = {clicked} num={3}/>
                <div ref={observe} className={NB.line}></div>
            </div>
        </div>
    )

}

export default NavigatorBar