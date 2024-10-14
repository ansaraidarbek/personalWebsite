import { useSelector } from 'react-redux';
import {useCallback, useRef} from 'react';
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
    const ResizeSensor = require('css-element-queries/src/ResizeSensor.js');
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ['Web Developer', 'UI/UX Designer', 'Data Scientist'];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 10);
    const isMobile = useSelector((state:RootState) => state.device.value);
    const fontSize = useSelector((state:RootState) => state.fontSize.value);
    const rightPictureRef = useRef<HTMLDivElement|null>(null);
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

    const shiftRightImage = useCallback(() => {
        // the shift works only for high width devices
        if (!isMobile && rightPictureRef.current) {
            const limit = fontSize * 11.314;
            const currentWidth = rightPictureRef.current.offsetWidth;
            console.log(currentWidth, limit);
            if (currentWidth < limit) {
                console.log(limit - currentWidth);
                rightPictureRef.current.style.top = (limit - currentWidth) + "px";
            } else {
                rightPictureRef.current.style.top = "0px";
            }
        }
        console.log("shifted")
    }, [fontSize]);

    useEffect(() => {
        new ResizeSensor(rightPictureRef.current, shiftRightImage);

    }, []);

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
            setDelta(prevDelta => prevDelta / 1.4);
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
                    <p className={AM.brown}>
                        Frontend developer with 2+ years of experience specializing in
                        building responsive and interactive web applications using
                        React, JavaScript, and CSS. Passionate about creating intuitive
                        user experiences and collaborating on cross-functional teams.
                    </p>
                    <p>Along with front-end development, I have a solid understanding of algorithms, machine learning, and data analysis tools, which enables me to create optimized solutions. My knowledge of UI/UX principles also allows me to design interfaces that are both functional and user-centric.</p>
                    <p className={AM.brown}>I’m particularly interested in areas like psychology, human-computer interaction, e-commerce, software engineering, and project management. These fields allow me to blend technical skills with insights into user behavior, which helps me design digital experiences that are both effective and engaging.</p>
                    </div>
                <div className = {AM.right}>
                    <div ref = {rightPictureRef} className={AM.right_inner}>
                        <img src={require("../../images/mainPhoto.jpg")} alt="Main Photo" />
                    </div>
                </div>
            </div>
        </div>
    </section>
)};

export default AboutMeSection;