// SVG 背景模板
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
      
      // 创建渐变ID
      const gradientId = `heazy-wave-gradient-${Math.random().toString(36).substring(2, 9)}`;
      
      // 创建多个波浪层
      let waveLayers = '';
      for (let i = 0; i < layers; i++) {
        const layerOpacity = (wavesOpacity * (layers - i)) / layers;
        const heightPosition = height * (i + 1) / (layers + 1);
        
        let path = `M0,${heightPosition}`;
        
        // 生成波浪路径
        for (let x = 0; x <= width; x += 10) {
          const directionFactor = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
          const timeOffset = (i * speed / layers) * directionFactor;
          const waveHeight = amplitude * Math.sin((x * frequency) + timeOffset);
          const y = heightPosition + waveHeight;
          path += ` L${x},${y}`;
        }
        
        path += ` L${width},${height} L0,${height} Z`;
        
        const color = style === 'outline' ? 'none' : (i % 2 === 0 ? params.color1 : params.color2);
        const strokeColor = i % 2 === 0 ? params.color1 : params.color2;
        const strokeWidth = style === 'outline' ? 2 : 0;
        
        waveLayers += `<path fill="${color}" stroke="${strokeColor}" stroke-width="${strokeWidth}" d="${path}" style="transform-origin: center; transform: rotate(${rotation}deg)" opacity="${layerOpacity}"></path>`;
      }
      
      // 创建背景
      let background;
      if (useGradientBg) {
        const gradient = `
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${params.color1}" />
            <stop offset="100%" stop-color="${params.color2}" />
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
      color2: '#2dd4bf',
      backgroundColor: '#001220',
      height: 400,
      amplitude: 40,
      frequency: 0.015,
      layers: 3,
      speed: 0.2,
      rotation: 0,
      contrast: 80,
      wavesOpacity: 0.7,
      style: 'solid',
      direction: 'right',
      useGradientBg: true
    }
  }
]; 