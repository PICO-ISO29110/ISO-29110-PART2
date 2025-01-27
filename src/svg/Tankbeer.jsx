import React from 'react';
import tankImage from '../image/tank_water_rm.png';
import { Box } from '@mui/material';

function Tankbeer({ level = 100, width , height }) {
  const tankHeight = 300; // ความสูงของถังเบียร์
  const beerHeight = (level / 100) * tankHeight; // ความสูงของเบียร์
  const beerYPosition = 350 - beerHeight; // ตำแหน่ง Y ของระดับเบียร์

  return (
    <>
 
    <svg width="100%" height="85%" style={{ position: 'relative' }}>
  {/* Image as background */}
  
  <image href={tankImage} x="0" y="0" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 ,}} />
  
  {/* SVG content */}

  <svg
    id="beerTankSvg"
    width="111%"
    height="80%"
    viewBox="-490 -150 1390 500"
    style={{
        display: 'flex',
        position: 'absolute',
        width : '100%',
        height : '100%',
        top: 0,
        left: 0,
        zIndex : 1,
      }}
  >
    {/* Tank Shape */}
    <path d="M 70 50 Q 100 20, 130 50 L 130 350 Q 100 390, 70 350 Z" fill="white" stroke="black" strokeWidth="2" />

    {/* Water Level */}
    <path
      id="waterLevel"
      d={`M 70 ${beerYPosition} Q 85 ${beerYPosition - 10}, 100 ${beerYPosition} T 130 ${beerYPosition} L 130 350 Q 100 390, 70 350 Z`}
      fill="skyblue"
    >
      <animate
        attributeName="d"
        values={`M 70 ${beerYPosition} Q 85 ${beerYPosition - 10}, 100 ${beerYPosition} T 130 ${beerYPosition} L 130 350 Q 100 390, 70 350 Z;
                M 70 ${beerYPosition + 5} Q 85 ${beerYPosition - 5}, 100 ${beerYPosition + 5} T 130 ${beerYPosition + 5} L 130 350 Q 100 390, 70 350 Z;
                M 70 ${beerYPosition} Q 85 ${beerYPosition - 10}, 100 ${beerYPosition} T 130 ${beerYPosition} L 130 350 Q 100 390, 70 350 Z`}
        dur="3s"
        repeatCount="indefinite"
      />
    </path>

    {/* Bubbles */}
    <circle id="bubble1" cx="90" cy={beerYPosition + 50} r="5" fill="white" opacity="0.8">
      <animate attributeName="cy" from={beerYPosition + 50} to="50" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.8;0" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle id="bubble2" cx="110" cy={beerYPosition + 70} r="5" fill="white" opacity="0.8">
      <animate attributeName="cy" from={beerYPosition + 70} to="70" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.8;0" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
</svg>


    </>
    
  );
}

export default Tankbeer;
