// SVG Background Templates
export const SVG_BACKGROUNDS = [
  {
    name: "波浪",
    svgTemplate: (params: any) => {
      const width = 1440;
      const height = params.height || 400;
      const amplitude = params.amplitude || 40;
      const frequency = params.frequency || 0.015;
      const layers = params.layers || 3;
      const speed = params.speed || 0.2;
      const rotation = params.rotation || 0;
      const contrast = params.contrast || 80;
      const wavesOpacity = params.wavesOpacity || 0.7;
      const style = params.style || 'solid';
      const direction = params.direction || 'right';
      const useGradientBg = params.hasOwnProperty('useGradientBg') ? params.useGradientBg : true;
      
      // Create gradient ID
      const gradientId = `heazy-wave-gradient-${Math.random().toString(36).substring(2, 9)}`;
      
      // Create multiple wave layers - optimized algorithm for more natural effects
      let waveLayers = '';
      
      // Create more complex waves for each layer
      for (let i = 0; i < layers; i++) {
        const layerOpacity = Math.pow((layers - i) / layers, 0.8) * wavesOpacity;
        const baseHeight = height * 0.6 + (i * height * 0.15 / layers);
        
        // Use finer steps to create smoother curves
        const step = 2;
        let path = `M0,${baseHeight}`;
        
        // Generate more natural wave paths using multiple sine wave overlays
        for (let x = 0; x <= width; x += step) {
          const directionFactor = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
          const timeOffset = (i * speed / layers) * directionFactor;
          
          // Main wave - large amplitude, low frequency
          const mainWave = amplitude * 0.8 * Math.sin((x * frequency * 0.8) + timeOffset);
          
          // Secondary wave - medium amplitude, medium frequency
          const secondWave = amplitude * 0.3 * Math.sin((x * frequency * 2.5) + timeOffset * 1.5);
          
          // Detail wave - small amplitude, high frequency
          const detailWave = amplitude * 0.15 * Math.sin((x * frequency * 6) + timeOffset * 2);
          
          // Add some randomness to simulate natural waves
          const randomOffset = amplitude * 0.1 * Math.sin((x * frequency * 0.3) + timeOffset * 0.7);
          
          // Layer offset to create better depth perception
          const layerOffset = i * amplitude * 0.2 * Math.sin((x * frequency * 1.2) + i * Math.PI / 3);
          
          const totalWaveHeight = mainWave + secondWave + detailWave + randomOffset + layerOffset;
          const y = baseHeight + totalWaveHeight;
          
          if (x === 0) {
            path = `M0,${y}`;
          } else {
            // Use quadratic Bezier curves for smoother connections
            const prevX = x - step;
            const controlX = x - step / 2;
            const controlY = y;
            path += ` Q${controlX},${controlY} ${x},${y}`;
          }
        }
        
        // Close path to bottom
        path += ` L${width},${height} L0,${height} Z`;
        
        // Improved color handling for better gradient effects
        let fillColor, strokeColor;
        if (style === 'outline') {
          fillColor = 'none';
          strokeColor = i % 2 === 0 ? params.color1 : params.color2;
        } else {
          // Create slightly different colors for each layer to add depth
          const baseColor = i % 2 === 0 ? params.color1 : params.color2;
          const colorVariation = 1 - (i * 0.1); // Each layer slightly darker
          fillColor = baseColor;
          strokeColor = 'none';
        }
        
        const strokeWidth = style === 'outline' ? 2 : 0;
        
        waveLayers += `<path fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" d="${path}" style="transform-origin: center; transform: rotate(${rotation}deg)" opacity="${layerOpacity}"></path>`;
      }
      
      // Create background - optimized gradient effects
      let background;
      if (useGradientBg) {
        // Create more complex multi-color gradient background, simulating deep to shallow sea effect
        const gradient = `
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" stop-opacity="1" />
            <stop offset="30%" stop-color="#1e293b" stop-opacity="1" />
            <stop offset="60%" stop-color="${params.color1}" stop-opacity="0.8" />
            <stop offset="100%" stop-color="${params.color2}" stop-opacity="0.9" />
          </linearGradient>
        `;
        background = `<rect width="${width}" height="${height}" fill="url(#${gradientId})" />`;
        
        return `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            ${gradient}
          </defs>
          ${background}
          ${waveLayers}
        </svg>`;
      } else {
        background = `<rect width="${width}" height="${height}" fill="${params.backgroundColor || '#001220'}" />`;
        
        return `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          ${background}
          ${waveLayers}
        </svg>`;
      }
    },
    defaultParams: {
      color1: '#3b82f6',
      color2: '#06b6d4',
      backgroundColor: '#0f172a',
      height: 400,
      amplitude: 60,
      frequency: 0.008,
      layers: 4,
      speed: 0.3,
      rotation: 0,
      contrast: 85,
      wavesOpacity: 0.85,
      style: 'solid',
      direction: 'right',
      useGradientBg: true
    }
  }
];