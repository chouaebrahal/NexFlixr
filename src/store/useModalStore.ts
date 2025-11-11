import {create} from 'zustand'


interface ModalState {
    searchModal:boolean,
    modalOpen: boolean,
    movieID: number,
    closeSearchModal: () => void,
    toggleModal: () => void,
    openSearchModal: () => void,
    alert:string | null,
    setAlert: (alert:string) => void

    
}


export const useModalStore = create<ModalState>(
    (set,get)=>({
        searchModal:false,
        modalOpen:false,
        movieID:0,
        alert:null,
        setAlert: (alert) => {
            set({alert:alert})
              setTimeout(()=>{
               set({alert:null})
             },2000)
        },
        toggleModal:()=>{
            set({modalOpen:!get().modalOpen})
        },
        closeSearchModal: () => {
            set({searchModal:false})
        },
        openSearchModal: () => {
             set({searchModal:true})
        }

        
    })
)