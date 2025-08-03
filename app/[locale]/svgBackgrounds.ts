// ... Existing wave pattern code ...

// Ensure heazyWaveTemplate export at the top of the file
const heazyWaveTemplate = (params: any) => {
  // Simplified template implementation
  const { backgroundColor, color1, color2 } = params;
  return `<svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="${backgroundColor}" />
    <path d="M0,100 Q200,180 400,100 T800,100 L800,600 L0,600 Z" fill="${color1}" />
    <path d="M0,150 Q200,50 400,150 T800,150 L800,600 L0,600 Z" fill="${color2}" opacity="0.7" />
  </svg>`;
};

// Corner template
const cornersTemplate = (params: any) => {
  const { 
    backgroundColor, 
    color1, 
    color2, 
    cornerRadius, 
    cornerCount, 
    strokeWidth, 
    rotation,
    style,
    position = ['topLeft', 'bottomRight'],
    mirrorEdges = false,
    offsetX = 0,
    offsetY = 0,
    radius = 0,
    shadowColor = '#00000061',
    balance = 50,
    velocity = 50,
    layers = 0,
    layerDistance = 50
  } = params;
  
  // Create filter definition
  const filterId = "cornerShadow";
  const filterDef = radius > 0 ? 
    `<filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="${offsetX}" dy="${offsetY}" stdDeviation="${radius}" flood-color="${shadowColor}" />
    </filter>` : '';
  
  // Calculate styles
  const pathStyle = style === 'outline' ? 
    `fill="none" stroke="${color1}" stroke-width="${strokeWidth || 30}"` : 
    `fill="${color1}" stroke="none"`;
  
  // Generate corner paths
  let paths = '';
  
  // Handle positions
  const width = 800;
  const height = 600;
  const cornerSize = cornerRadius || 150;
  
  // Adjust curves based on balance and velocity
  const balanceFactor = (balance - 50) / 100;
  const velocityFactor = velocity / 100;
  
  // Generate corner paths for each corner
   const generateCornerPath = (x: number, y: number, isRight: boolean, isBottom: boolean) => {
    // Adjust control point positions
    const cpDistance = cornerSize * (1 + balanceFactor);
    const cpOffset = cornerSize * velocityFactor;
    
    let path = '';
    // Determine path direction based on position
    if (isRight && isBottom) {
      // Bottom right corner
      path = `M${x-cornerSize},${y} Q${x-cpOffset},${y+cpDistance} ${x},${y+cornerSize}`;
    } else if (isRight && !isBottom) {
      // Top right corner
      path = `M${x-cornerSize},${y} Q${x-cpOffset},${y-cpDistance} ${x},${y-cornerSize}`;
    } else if (!isRight && isBottom) {
      // Bottom left corner
      path = `M${x+cornerSize},${y} Q${x+cpOffset},${y+cpDistance} ${x},${y+cornerSize}`;
    } else {
      // Top left corner
      path = `M${x+cornerSize},${y} Q${x+cpOffset},${y-cpDistance} ${x},${y-cornerSize}`;
    }
    
    return path;
  };
  
  // Add corners for each specified position
  for (let i = 0; i < cornerCount; i++) {
    // Create corners at different positions
    if (position.includes('topLeft')) {
      const x = cornerSize + (i * layerDistance);
      const y = cornerSize + (i * layerDistance);
      paths += `<path d="${generateCornerPath(x, y, false, false)}" ${pathStyle} ${radius > 0 ? `filter="url(#${filterId})"` : ''} />`;
    }
    
    if (position.includes('topRight')) {
      const x = width - cornerSize - (i * layerDistance);
      const y = cornerSize + (i * layerDistance);
      paths += `<path d="${generateCornerPath(x, y, true, false)}" ${pathStyle} ${radius > 0 ? `filter="url(#${filterId})"` : ''} />`;
    }
    
    if (position.includes('bottomLeft')) {
      const x = cornerSize + (i * layerDistance);
      const y = height - cornerSize - (i * layerDistance);
      paths += `<path d="${generateCornerPath(x, y, false, true)}" ${pathStyle} ${radius > 0 ? `filter="url(#${filterId})"` : ''} />`;
    }
    
    if (position.includes('bottomRight')) {
      const x = width - cornerSize - (i * layerDistance);
      const y = height - cornerSize - (i * layerDistance);
      paths += `<path d="${generateCornerPath(x, y, true, true)}" ${pathStyle} ${radius > 0 ? `filter="url(#${filterId})"` : ''} />`;
    }
    
    // Exit loop if layer count reaches the set value
    if (i >= layers && layers > 0) break;
  }
  
  // Create SVG
  return `<svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" fill="${backgroundColor}" />
    ${filterDef}
    <g transform="rotate(${rotation || 0}, 400, 300)">
      ${paths}
    </g>
  </svg>`;
};

// Generate corner paths
const generateCorners = (count: number, radius: number, color1: string, color2: string, strokeWidth: number) => {
  let paths = '';
  const width = 800;
  const height = 600;
  
  for (let i = 0; i < count; i++) {
    const percent = i / count;
    const color = interpolateColor(color1, color2, percent);
    
    // Random position, but ensure within canvas
    const x = Math.random() * (width - radius * 2) + radius;
    const y = Math.random() * (height - radius * 2) + radius;
    
    paths += `<path d="M${x-radius},${y} Q${x},${y-radius} ${x+radius},${y} T${x-radius},${y}" 
                  fill="none" stroke="${color}" stroke-width="${strokeWidth}" />`;
  }
  
  return paths;
};

// Color interpolation function
const interpolateColor = (color1: string, color2: string, factor: number) => {
  // Simple implementation, actual projects may need more complex color interpolation
  if (factor === 0) return color1;
  if (factor === 1) return color2;
  
  try {
    const c1 = color1.startsWith('#') ? 
      [parseInt(color1.slice(1, 3), 16), parseInt(color1.slice(3, 5), 16), parseInt(color1.slice(5, 7), 16)] : 
      [0, 0, 0];
    
    const c2 = color2.startsWith('#') ? 
      [parseInt(color2.slice(1, 3), 16), parseInt(color2.slice(3, 5), 16), parseInt(color2.slice(5, 7), 16)] : 
      [255, 255, 255];
    
    const r = Math.round(c1[0] + factor * (c2[0] - c1[0]));
    const g = Math.round(c1[1] + factor * (c2[1] - c1[1]));
    const b = Math.round(c1[2] + factor * (c2[2] - c1[2]));
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } catch (e) {
    return color1;
  }
};

// Export SVG background definitions
export const SVG_BACKGROUNDS = [
  {
    name: "波浪",
    svgTemplate: heazyWaveTemplate,
    defaultParams: {
      color1: "#ff0071ff",
      color2: "#95ffa1ff",
      backgroundColor: "#95ffda",
      height: 400,
      amplitude: 75,
      frequency: 0.3,
      layers: 3,
      speed: 0.5,
      rotation: 0,
      contrast: 50,
      wavesOpacity: 0.8,
      style: "solid",
      direction: "horizontal",
      useGradientBg: false
    }
  },
  {
    name: "角落",
    svgTemplate: cornersTemplate,
    defaultParams: {
      color1: "#ff0071ff",
      color2: "#95ffa1ff",
      backgroundColor: "#95ffda",
      cornerRadius: 150,
      cornerCount: 5,
      strokeWidth: 30,
      rotation: 0,
      contrast: 50,
      style: "solid",
      position: ['topLeft', 'bottomRight'],
      mirrorEdges: false,
      offsetX: 0,
      offsetY: 0,
      radius: 0,
      shadowColor: '#00000061',
      balance: 50,
      velocity: 50,
      layers: 0,
      layerDistance: 50
    }
  }
];