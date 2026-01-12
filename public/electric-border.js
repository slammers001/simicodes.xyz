// Vanilla JavaScript Electric Border Component
// Converted from React to work with your existing setup

class ElectricBorder {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            color: options.color || '#ff6b6b',
            speed: options.speed || 2.1,
            chaos: options.chaos || 0.09,
            borderRadius: options.borderRadius || 0,
            ...options
        };
        
        this.canvas = null;
        this.ctx = null;
        this.animationRef = null;
        this.timeRef = 0;
        this.lastFrameTimeRef = 0;
        
        this.init();
    }
    
    random(x) {
        return (Math.sin(x * 12.9898) * 43758.5453) % 1;
    }
    
    noise2D(x, y) {
        const i = Math.floor(x);
        const j = Math.floor(y);
        const fx = x - i;
        const fy = y - j;
        
        const a = this.random(i + j * 57);
        const b = this.random(i + 1 + j * 57);
        const c = this.random(i + (j + 1) * 57);
        const d = this.random(i + 1 + (j + 1) * 57);
        
        const ux = fx * fx * (3.0 - 2.0 * fx);
        const uy = fy * fy * (3.0 - 2.0 * fy);
        
        return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    }
    
    octavedNoise(x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) {
        let y = 0;
        let amplitude = baseAmplitude;
        let frequency = baseFrequency;
        
        for (let i = 0; i < octaves; i++) {
            let octaveAmplitude = amplitude;
            if (i === 0) {
                octaveAmplitude *= baseFlatness;
            }
            y += octaveAmplitude * this.noise2D(frequency * x + seed * 100, time * frequency * 0.3);
            frequency *= lacunarity;
            amplitude *= gain;
        }
        
        return y;
    }
    
    getCornerPoint(centerX, centerY, radius, startAngle, arcLength, progress) {
        const angle = startAngle + progress * arcLength;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    }
    
    getRoundedRectPoint(t, left, top, width, height, radius) {
        const straightWidth = width - 2 * radius;
        const straightHeight = height - 2 * radius;
        const cornerArc = (Math.PI * radius) / 2;
        const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
        const distance = t * totalPerimeter;
        
        let accumulated = 0;
        
        // Top edge
        if (distance <= accumulated + straightWidth) {
            const progress = (distance - accumulated) / straightWidth;
            return { x: left + radius + progress * straightWidth, y: top };
        }
        accumulated += straightWidth;
        
        // Top-right corner
        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
        }
        accumulated += cornerArc;
        
        // Right edge
        if (distance <= accumulated + straightHeight) {
            const progress = (distance - accumulated) / straightHeight;
            return { x: left + width, y: top + radius + progress * straightHeight };
        }
        accumulated += straightHeight;
        
        // Bottom-right corner
        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
        }
        accumulated += cornerArc;
        
        // Bottom edge
        if (distance <= accumulated + straightWidth) {
            const progress = (distance - accumulated) / straightWidth;
            return { x: left + width - radius - progress * straightWidth, y: top + height };
        }
        accumulated += straightWidth;
        
        // Bottom-left corner
        if (distance <= accumulated + cornerArc) {
            const progress = (distance - accumulated) / cornerArc;
            return this.getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
        }
        accumulated += cornerArc;
        
        // Left edge
        if (distance <= accumulated + straightHeight) {
            const progress = (distance - accumulated) / straightHeight;
            return { x: left, y: top + height - radius - progress * straightHeight };
        }
        accumulated += straightHeight;
        
        // Top-left corner
        const progress = (distance - accumulated) / cornerArc;
        return this.getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    }
    
    updateSize() {
        const rect = this.container.getBoundingClientRect();
        const width = rect.width + this.borderOffset * 2;
        const height = rect.height + this.borderOffset * 2;
        
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.ctx.scale(dpr, dpr);
        
        return { width, height };
    }
    
    drawElectricBorder(currentTime) {
        if (!this.canvas || !this.ctx) return;
        
        const deltaTime = (currentTime - this.lastFrameTimeRef) / 1000;
        this.timeRef += deltaTime * this.options.speed;
        this.lastFrameTimeRef = currentTime;
        
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.scale(dpr, dpr);
        
        // Enhanced neon styling
        this.ctx.strokeStyle = this.options.color;
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Add glow effects
        this.ctx.shadowColor = this.options.color;
        this.ctx.shadowBlur = 15;
        this.ctx.globalAlpha = 0.9;
        
        const scale = this.displacement;
        const left = this.borderOffset;
        const top = this.borderOffset;
        const borderWidth = this.width - 2 * this.borderOffset;
        const borderHeight = this.height - 2 * this.borderOffset;
        const maxRadius = Math.min(borderWidth, borderHeight) / 2;
        const radius = Math.min(this.options.borderRadius, maxRadius);
        
        const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
        const sampleCount = Math.floor(approximatePerimeter / 2);
        
        // Main electric border
        this.ctx.beginPath();
        
        for (let i = 0; i <= sampleCount; i++) {
            const progress = i / sampleCount;
            
            const point = this.getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);
            
            const xNoise = this.octavedNoise(
                progress * 8,
                this.octaves,
                this.lacunarity,
                this.gain,
                this.amplitude,
                this.frequency,
                this.timeRef,
                0,
                this.baseFlatness
            );
            
            const yNoise = this.octavedNoise(
                progress * 8,
                this.octaves,
                this.lacunarity,
                this.gain,
                this.amplitude,
                this.frequency,
                this.timeRef,
                1,
                this.baseFlatness
            );
            
            const displacedX = point.x + xNoise * scale;
            const displacedY = point.y + yNoise * scale;
            
            if (i === 0) {
                this.ctx.moveTo(displacedX, displacedY);
            } else {
                this.ctx.lineTo(displacedX, displacedY);
            }
        }
        
        this.ctx.closePath();
        this.ctx.stroke();
        
        // Add inner neon glow
        this.ctx.lineWidth = 1;
        this.ctx.shadowBlur = 25;
        this.ctx.globalAlpha = 0.6;
        this.ctx.strokeStyle = this.options.color;
        this.ctx.stroke();
        
        // Add outer neon glow
        this.ctx.lineWidth = 3;
        this.ctx.shadowBlur = 35;
        this.ctx.globalAlpha = 0.3;
        this.ctx.strokeStyle = this.options.color;
        this.ctx.stroke();
        
        this.animationRef = requestAnimationFrame((time) => this.drawElectricBorder(time));
    }
    
    init() {
        // Configuration
        this.octaves = 10;
        this.lacunarity = 1.6;
        this.gain = 0.7;
        this.amplitude = this.options.chaos;
        this.frequency = 10;
        this.baseFlatness = 0;
        this.displacement = 60;
        this.borderOffset = 60;
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'eb-canvas';
        this.ctx = this.canvas.getContext('2d');
        
        // Create wrapper structure
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'eb-canvas-container';
        canvasContainer.appendChild(this.canvas);
        
        const layers = document.createElement('div');
        layers.className = 'eb-layers';
        layers.innerHTML = `
            <div class="eb-glow-1"></div>
            <div class="eb-glow-2"></div>
            <div class="eb-background-glow"></div>
        `;
        
        const content = document.createElement('div');
        content.className = 'eb-content';
        
        // Move existing content to new structure
        while (this.container.firstChild) {
            content.appendChild(this.container.firstChild);
        }
        
        // Set up electric border structure
        this.container.style.setProperty('--electric-border-color', this.options.color);
        this.container.style.borderRadius = this.options.borderRadius + 'px';
        this.container.className = 'electric-border ' + (this.container.className || '');
        
        this.container.appendChild(canvasContainer);
        this.container.appendChild(layers);
        this.container.appendChild(content);
        
        // Update size and start animation
        let { width, height } = this.updateSize();
        this.width = width;
        this.height = height;
        
        // Handle resize
        const resizeObserver = new ResizeObserver(() => {
            const newSize = this.updateSize();
            this.width = newSize.width;
            this.height = newSize.height;
        });
        resizeObserver.observe(this.container);
        
        // Start animation
        this.animationRef = requestAnimationFrame((time) => this.drawElectricBorder(time));
    }
    
    destroy() {
        if (this.animationRef) {
            cancelAnimationFrame(this.animationRef);
        }
    }
}

// Export for use
window.ElectricBorder = ElectricBorder;
