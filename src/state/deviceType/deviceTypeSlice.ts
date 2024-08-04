import { createSlice } from "@reduxjs/toolkit";


interface DeviceState { 
    value: boolean;
}

const handleDevice = () => {
  if (window) {
    const { innerWidth: width, innerHeight: height } = window;
    return (height / width) > 1;
  } 
  return false;
};

const initialState: DeviceState = {
    value: handleDevice(),
};

const DeviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
      changeDevice: (state) => {
        const isMobile = handleDevice();
        if (isMobile !== state.value) {
          state.value = isMobile;
        }
      }
    }
});

export const { changeDevice } = DeviceSlice.actions;
export default DeviceSlice.reducer;