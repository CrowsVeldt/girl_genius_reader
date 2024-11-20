import React, { createContext, useState, useEffect } from "react";
import { retrieveData, saveData } from "../utils/storage";
import { PreloadPolicyType, ScrollDirectionType } from "../utils/types";
import { changeList } from "../changelog";

type AppContextType = {
  changePreloadPolicy: (policy: PreloadPolicyType) => void;
  changeScrollDirection: (dir: ScrollDirectionType) => void;
  getPreloadPolicy: () => PreloadPolicyType;
  getNewVersionBool: () => boolean;
  getScrollDirection: () => ScrollDirectionType;
};

export const AppContext = createContext<AppContextType>(
  null as unknown as AppContextType
);

const AppProvider = ({ children }: { children: any }) => {
  const [preloadPolicy, setPreloadPolicy] = useState<PreloadPolicyType>("wifi");
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirectionType>("vertical");
  const [newVersion, setNewVersion] = useState<boolean>(false);

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

  useEffect(() => {
    (async () => {
      const savedVersionNumber: string = await retrieveData(
        process.env.EXPO_PUBLIC_LAST_VERSION_NUMBER_KEY!
      );

      if (savedVersionNumber != null) {
        const latestVersionNumber: string = changeList[0][0];
        if (savedVersionNumber != latestVersionNumber) {
          setNewVersion(true);
          saveData(
            process.env.EXPO_PUBLIC_LAST_VERSION_NUMBER_KEY!,
            latestVersionNumber
          );
        } else {
          setNewVersion(false);
        }
      } else {
        saveData(
          process.env.EXPO_PUBLIC_LAST_VERSION_NUMBER_KEY!,
          changeList[0][0]
        );
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
  const getNewVersionBool: () => boolean = () => newVersion;
  const getScrollDirection: () => ScrollDirectionType = () => scrollDirection;

  const value = {
    changePreloadPolicy,
    changeScrollDirection,
    getPreloadPolicy,
    getNewVersionBool,
    getScrollDirection,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
