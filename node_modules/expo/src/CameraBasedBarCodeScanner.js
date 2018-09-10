// @flow

import React from 'react';
import { Camera } from 'expo-camera';

type Data = {
  data: string,
  type: string,
};

type Props = {
  torchMode?: string | number,
  type?: string | number,
  onBarCodeRead: Data => void,
  barCodeTypes: string[],
};

export default class BarCodeScanner extends React.Component<Props> {
  static Constants = {
    ...Camera.Constants,
    TorchMode: {
      on: Camera.Constants.FlashMode.torch,
      off: Camera.Constants.FlashMode.off,
    },
  };

  render() {
    const props: Props & { flashMode?: number } = { ...this.props };
    if (props.torchMode !== undefined) {
      if (typeof props.torchMode === 'string') {
        props.flashMode = BarCodeScanner.Constants.TorchMode[props.torchMode];
      } else {
        props.flashMode = props.torchMode;
      }
      delete props.torchMode;
    }
    return <Camera {...props} />;
  }
}

export const Constants = BarCodeScanner.Constants;
