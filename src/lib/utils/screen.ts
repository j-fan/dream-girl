import { browser } from '$app/environment';

export const isMobileScreen = () => {
  if (browser) {
    return window.innerWidth < 430;
  }

  return false;
};

export const isTabletPortraitScreen = () => {
  if (browser) {
    return window.innerWidth < 820;
  }

  return false;
};

export const isTabletScreen = () => {
  if (browser) {
    return window.innerWidth < 1200;
  }

  return false;
};

export const isDesktopScreen = () => {
  if (browser) {
    return window.innerWidth < 1600;
  }

  return false;
};

export const isWideDesktopScreen = () => {
  if (browser) {
    return window.innerWidth >= 1600;
  }

  return false;
};
