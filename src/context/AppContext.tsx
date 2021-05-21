import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { CommitResponse } from '~/entities/CommitResponse'
import { LangStat } from '~/entities/LangStats/LangStat'
import { CommitLanguageResponse } from '~/entities/LanguageResponse'
import { Repo } from '~/entities/Repo'
import { UserProfile } from '~/entities/UserProfile'

export interface IProfile {
  langStats: LangStat[] | null
  repos: Repo[] | null
  commits: CommitResponse[] | null
  commitsLanguage: CommitLanguageResponse[] | null
  profile: UserProfile | null
}

type AppContextType = {
  profile: IProfile
  setUserProfile: (profile: IProfile) => void
}

const defaultProfile = {
  langStats: null,
  repos: null,
  commits: null,
  profile: null,
  commitsLanguage: null,
}
const defaultState: AppContextType = {
  profile: defaultProfile,
  setUserProfile: () => {
    // Empty
  },
}

const AppContext = createContext<AppContextType>(defaultState)

export function useAppContext() {
  return useContext(AppContext)
}

// App Provider

type Props = {
  children: ReactNode
}

export function AppProvider({ children }: Props): JSX.Element {
  const [profile, setProfile] = useState<IProfile>(defaultProfile)
  const [value, setValue] = useState<AppContextType>(defaultState)

  const setUserProfile = (userProfile: IProfile): void => {
    // console.log(userProfile)
    setProfile({ ...profile, ...userProfile })
  }
  useEffect(() => {
    if (profile) {
      const value: AppContextType = {
        profile,
        setUserProfile,
      }
      setValue(value)
    }
    // eslint-disable-next-line
  }, [profile])

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  )
}
