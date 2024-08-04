import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import CB from '../shared-css-files/contentOuterBox.module.css';
import AM from './aboutMe.module.css';
import cx from 'classnames';
import {useEffect, useState} from 'react';

const returnText = (isMobile : boolean, text : string) => {
    const newText = text.split(' ');
    return isMobile ? <span>{newText[0]}<br></br>{newText[1]}</span> : <span>{text}</span>;
};

const AboutMeSection = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ['Web Developer', 'UI/UX Designer', 'Data Scientist'];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 10);
    const isMobile = useSelector((state:RootState) => state.device.value);
    // console.log('hello from aboutMe', isMobile);
    const period = 1000;
    // const targetTextBoxRef = useRef<HTMLDivElement|null>(null);
    // const targetTextRef = useRef<HTMLDivElement|null>(null);
    // const [overflowActive, setOverflowActive] = useState(false);
    // const [showMore, setShowMore] = useState(false);

    // const checkOverflow = useCallback(() => {
    //     const textContainer = targetTextBoxRef.current;
    //     if (textContainer) {
    //         console.log(textContainer.offsetHeight, textContainer.scrollHeight);
    //         return (
    //             textContainer.offsetHeight < textContainer.scrollHeight || textContainer.offsetWidth < textContainer.scrollWidth
    //         );
    //     }
    //     return false;
    // }, []);

    // useEffect(() => {
    //     window.addEventListener('resize', checkOverflow);
    //     return () => {
    //         window.removeEventListener('scroll', checkOverflow);
    //     };
    // }, []);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {clearInterval(ticker)};
    }, [text]);

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updateText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updateText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updateText === fullText) {
            setIsDeleting(true);
            setDelta(period)
        } else if (isDeleting && updateText === ''){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    };
    return (
    <section id="about_me" className={CB.outer}>
        <div className={cx(CB.inner, AM.outer)}>
            <div className={AM.inner}>
                <div className={AM.mainText}>
                    <h1><span>{isMobile ? "Hi! I’m Angsar" : "Hi! I’m Aidarbek Angsar"}</span><br></br>
                    a skilled {returnText(isMobile, text)}</h1>   
                </div>
                <div className={AM.left}>
                    <p className={AM.brown}></p>
                    <p></p>
                    <p className={AM.brown}></p>
                </div>
                <div className={AM.right}></div>
            </div>
        </div>
    </section>
)};

export default AboutMeSection;