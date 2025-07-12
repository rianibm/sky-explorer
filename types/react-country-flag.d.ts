declare module 'react-country-flag' {
    import React, { CSSProperties } from 'react';
  
    interface ReactCountryFlagProps {
      countryCode: string;
      svg?: boolean;
      cdnUrl?: string;
      cdnSuffix?: string;
      style?: CSSProperties;
      className?: string;
      title?: string;
      'aria-label'?: string;
    }
  
    declare const ReactCountryFlag: React.FC<ReactCountryFlagProps>;
    export default ReactCountryFlag;
  }