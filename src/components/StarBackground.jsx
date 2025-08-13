import React, { useEffect } from 'react';
import '../styles/star.css'; // Tailwind doesn't cover custom animations

const StarBackground = () => {
    useEffect(() => {
        const container = document.querySelector('.starry-background');
        if (!container) return;

        // Clear previous stars if any
        container.innerHTML = '';

        // Generate stars
        const createStars = () => {
            const starCount = 300;
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star twinkle absolute bg-white rounded-full';

                const size = Math.random() * 3;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 2}s`;

                if (Math.random() > 0.9) {
                    star.style.backgroundColor = `hsl(${Math.random() * 60 + 200}, 100%, 80%)`;
                }

                container.appendChild(star);
            }
        };

        // Constellations
        const createConstellations = () => {
            const constellations = {
                orion: [
                    { x: 20, y: 30 }, { x: 25, y: 35 }, { x: 30, y: 30 },
                    { x: 25, y: 25 }, { x: 25, y: 40 }
                ],
                ursaMajor: [
                    { x: 70, y: 20 }, { x: 75, y: 25 }, { x: 80, y: 20 },
                    { x: 85, y: 25 }, { x: 90, y: 20 }, { x: 85, y: 15 }
                ],
                lyra: [
                    { x: 60, y: 60 }, { x: 63, y: 63 }, { x: 66, y: 60 },
                    { x: 63, y: 57 }, { x: 60, y: 60 }
                ]
            };

            Object.values(constellations).forEach(group => {
                group.forEach(star => {
                    const constellationStar = document.createElement('div');
                    constellationStar.className = 'constellation-star absolute bg-white rounded-full shadow-xl';

                    const size = 4 + Math.random() * 2;
                    constellationStar.style.width = `${size}px`;
                    constellationStar.style.height = `${size}px`;
                    constellationStar.style.left = `${star.x}%`;
                    constellationStar.style.top = `${star.y}%`;
                    constellationStar.style.animation = `constellation-pulse ${3 + Math.random() * 2}s infinite`;

                    container.appendChild(constellationStar);
                });
            });
        };

        // Shooting Stars
        const createShootingStar = () => {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star absolute';

            const startX = Math.random() * 100;
            shootingStar.style.left = `${startX}%`;
            shootingStar.style.top = '0%';

            const width = 50 + Math.random() * 100;
            shootingStar.style.width = `${width}px`;

            const curve = Math.random() * 20 + 200;
            container.appendChild(shootingStar);

            shootingStar.style.animation = `shooting-star-fall 2s linear`;
            shootingStar.style.setProperty('--curve', `${curve}px`);

            setTimeout(() => {
                const impact = document.createElement('div');
                impact.className = 'shooting-star-impact absolute';
                impact.style.left = `calc(${startX}% + ${width / 2}px)`;
                impact.style.top = '100%';
                container.appendChild(impact);

                setTimeout(() => {
                    shootingStar.remove();
                    impact.remove();
                }, 1000);
            }, 2000);
        };

        createStars();
        createConstellations();

        const interval = setInterval(() => {
            if (Math.random() > 0.3) {
                createShootingStar();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="starry-background fixed inset-0 bg-gradient-to-b from-black via-[#0a0e1a] to-black -z-10 overflow-hidden"></div>
    );
};

export default StarBackground;
