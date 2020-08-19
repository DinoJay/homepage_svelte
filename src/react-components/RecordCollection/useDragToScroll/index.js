import { useEffect } from 'react';
import css from './style.scss';
const useDragToScroll = ref => {
    const slider = ref.current;
    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;
    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDown = true;
            slider.classList.add(css.grabbing);
            startX = e.pageX - slider.offsetLeft;
            startY = e.pageY - slider.offsetTop;
            scrollLeft = slider.scrollLeft;
            scrollTop = slider.scrollTop;
        });
        slider.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            isDown = false;
            // for (const item of slider.children) {
            //   item.classList.remove(css.active);
            // }
            slider.classList.remove(css.grabbing);
        });
        slider.addEventListener('mouseup', (e) => {
            e.preventDefault();
            for (const item of slider.children) {
                item.classList.remove(css.active);
            }
            isDown = false;
            slider.classList.remove(css.grabbing);
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown)
                return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const y = e.pageY - slider.offsetTop;
            const walkX = (x - startX) * 1; // scroll-fast
            const walkY = (y - startY) * 1; // scroll-fast
            slider.scrollLeft = scrollLeft - walkX;
            slider.scrollTop = scrollTop - walkY;
            if (Math.abs(walkX) > 7 || Math.abs(walkY) > 7) {
                for (const item of slider.children) {
                    item.classList.add(css.active);
                }
            }
        });
    }
};
export const useScrollTo = (focusRef, ref) => {
    useEffect(() => {
        const parentEl = ref.current;
        if (parentEl) {
            const elements = parentEl.children;
            const rootWidth = parentEl.clientWidth;
            const rootHeight = parentEl.clientHeight;
            const el = focusRef.current;
            if (el) {
                const offsetX = el.offsetLeft - rootWidth / 2;
                const offsetY = el.offsetTop - rootHeight / 2;
                parentEl.scrollTo({
                    left: offsetX,
                    top: offsetY,
                    behavior: 'smooth'
                });
            }
        }
    });
    return { ref };
};
export default useDragToScroll;
