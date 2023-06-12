import { useEffect, useState } from 'react';
import stylesHeader from '../components/Header/stylesHeader.module.css';

interface RotatingTextsProps {
    texts: string[];
    delay: number;
};

function useChangeText({ texts, delay }: RotatingTextsProps): string {
    const [index, setIndex] = useState(0);
    const text = texts[index];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, delay);

        return () => clearInterval(intervalId);
    }, [delay, texts]);

    useEffect(() => {
        const element = document.querySelector(`.${stylesHeader['rotating-text']}`);
        if (element) {
            element.classList.add(stylesHeader.change);

            setTimeout(() => {
                element.classList.remove(stylesHeader.change);
            }, 500);
        }
    }, [text]);

    return text;
}

export default useChangeText;
