import React from 'react';

const Header = () => {
  return (
    <div style={{width: '100%', height: 51, background: 'black', position: 'relative'}}>
      <div style={{width: 170, height: 51, left: 160, top: 0, position: 'absolute', background: 'black', outline: '0.25px white solid', outlineOffset: '-0.12px'}}>
        <div style={{width: 30, height: 30, left: 24, top: 11, position: 'absolute', overflow: 'hidden'}}>
          <div style={{width: 25, height: 25, left: 2.50, top: 2.50, position: 'absolute', background: '#E3E3E3'}} />
        </div>
        <div style={{left: 63, top: 12, position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Bebas Neue', fontWeight: '400'}}>Nirav</div>
      </div>
      
      <div style={{width: 149, height: 51, left: 1057, top: 0, position: 'absolute', background: 'black', outline: '0.25px white solid', outlineOffset: '-0.12px'}}>
        <div style={{left: 43, top: 14, position: 'absolute', color: 'white', fontSize: 20, fontFamily: 'Bebas Neue', fontWeight: '400'}}>SEARCH</div>
      </div>
      
      <div style={{width: 74, height: 51, left: 1206, top: 0, position: 'absolute', opacity: 0.25, background: 'black', outline: '0.25px white solid', outlineOffset: '-0.12px'}}>
        <div style={{width: 24, height: 24, left: 25, top: 14, position: 'absolute', overflow: 'hidden'}}>
          <div style={{width: 16, height: 16, left: 3, top: 3, position: 'absolute', outline: '2px white solid', outlineOffset: '-1px'}} />
          <div style={{width: 4.35, height: 4.35, left: 16.65, top: 16.65, position: 'absolute', outline: '2px white solid', outlineOffset: '-1px'}} />
        </div>
      </div>
    </div>
  );
};

export default Header;