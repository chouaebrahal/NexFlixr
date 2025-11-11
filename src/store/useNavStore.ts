import {create} from "zustand"
import { persist } from "zustand/middleware";


interface NavStoreState{
    currentClicked:number;
    setCurrentClicked:(c:number) => void
    
}


export const useNavStore = create<NavStoreState>()(persist((set)=>({
   currentClicked:1,
   setCurrentClicked: (c)=> {
    set({currentClicked:c})
   },
  
}),{name:'currentlyClicked'})) 