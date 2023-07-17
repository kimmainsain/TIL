import React, { useRef, useEffect } from 'react';

const CanvasComponent = () => {
    const canvasRef = useRef(null);
    const linePoints = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            linePoints.current.push({ x, y });

            context.beginPath();
            context.arc(x, y, 5, 0, Math.PI * 2);
            context.fill();

            if (linePoints.current.length === 2) {
                context.beginPath();
                context.moveTo(linePoints.current[0].x, linePoints.current[0].y);
                context.lineTo(linePoints.current[1].x, linePoints.current[1].y);
                context.stroke();

                linePoints.current = [];
            }
        });
    }, []);

    return <canvas ref={canvasRef} width={500} height={500} />;
};

export default CanvasComponent;
