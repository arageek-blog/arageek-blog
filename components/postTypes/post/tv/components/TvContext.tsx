import { useQueryParam } from 'hooks';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { useIdle, useMedia } from 'react-use';
import useWindowFocus from 'use-window-focus';

export const TVContext = createContext({});

export const TVProvider = ({ children, slides, fetchMore, ...rest }) => {
  const isNotMuted = useQueryParam('vol') === '1';

  const windowFocused = useWindowFocus();
  const isIdle = useIdle(60e3);
  const isMobile = useMedia('(max-width: 688px)', true);
  const { push } = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullContent, setIsFullContent] = useState(false);
  const [isMuted, setIsMuted] = useState(!isNotMuted);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const currentItem = slides?.[selectedIndex] ?? {};

  useEffect(() => {
    const { uri } = currentItem;
    const url = isNotMuted ? `${uri}?vol=1` : uri;

    // push(url, undefined, { shallow: true });

    if (selectedIndex === slides.length - 3) {
      fetchMore();
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (isIdle || !windowFocused) {
      setIsPlaying(false);
    }
  }, [isIdle, setIsPlaying, windowFocused]);

  return (
    <TVContext.Provider
      value={{
        isMuted,
        setIsMuted,
        isPlaying,
        setIsPlaying,
        selectedIndex,
        setSelectedIndex,
        currentItem,
        prevBtnEnabled,
        setPrevBtnEnabled,
        nextBtnEnabled,
        setNextBtnEnabled,
        isFullContent,
        setIsFullContent,
        slides,
        isMobile,
        ...rest,
      }}
    >
      {children}
    </TVContext.Provider>
  );
};

export const useTVContext = () => {
  return useContext(TVContext);
};
