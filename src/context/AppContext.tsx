import React, { createContext, useState, useEffect } from "react";
import { showToast } from "../utils/notifications";
import { retrieveData, saveData } from "../utils/storage";
import { PreloadPolicyType, ScrollDirectionType } from "../utils/types";

type AppContextType = {
  changePreloadPolicy: (policy: PreloadPolicyType) => void;
  changeScrollDirection: (dir: ScrollDirectionType) => void;
  getPreloadPolicy: () => PreloadPolicyType;
  getScrollDirection: () => ScrollDirectionType;
};

export const AppContext = createContext<AppContextType>(
  null as unknown as AppContextType
);

const AppProvider = ({ children }: { children: any }) => {
  const [preloadPolicy, setPreloadPolicy] = useState<PreloadPolicyType>("wifi");
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirectionType>("vertical");

  useEffect(() => {
    (async () => {
      try {
        const savedPreloadPolicy: PreloadPolicyType = await retrieveData(
          process.env.EXPO_PUBLIC_PRELOAD_POLICY_KEY!
        );
        const savedScrollDirection: ScrollDirectionType = await retrieveData(
          process.env.EXPO_PUBLIC_SCROLL_DIRECTION_KEY!
        );

        if (savedPreloadPolicy != null) {
          setPreloadPolicy(savedPreloadPolicy);
        }
        if (savedScrollDirection != null) {
          setScrollDirection(savedScrollDirection);
        }
      } catch (error) {
        console.warn("An error occurred setting data");
        console.error(error);
      }
    })();
  }, []);

  const changePreloadPolicy: (policy: PreloadPolicyType) => void = (policy) => {
    saveData(process.env.EXPO_PUBLIC_PRELOAD_POLICY_KEY!, policy);
    setPreloadPolicy(policy);
  };

  const changeScrollDirection: (dir: ScrollDirectionType) => void = (dir) => {
    saveData(process.env.EXPO_PUBLIC_SCROLL_DIRECTION_KEY!, dir);
    setScrollDirection(dir);
  };
  const getPreloadPolicy: () => PreloadPolicyType = () => preloadPolicy;
  const getScrollDirection: () => ScrollDirectionType = () => scrollDirection;
  const value = {
    changePreloadPolicy,
    changeScrollDirection,
    getPreloadPolicy,
    getScrollDirection,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
