import React,{createContext,useContext} from 'react';
import { rootStore } from './root/root.store';


export * from './root/root.store'
export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const StoreConsumer = StoreContext.Consumer;

/**
 * This is react hooks to get StoreContext
 * @returns 
 */
export const useStore = () => {
    return useContext(StoreContext);
};

/**
 * This is just a function to get all stores in object
 * @returns 
 */
export const getStore = () => {
  return rootStore;
};

/**
 * Use this function to fetch any initial application data
 * @returns 
 */
export const fetchInitialData = ()=>{
  //Do small initial data fetch stuffs
}

/**
 * This is HOC component used in Class-component
 * @returns 
 */
export function withStore(WrapperComponent) {

  return (props) => {
    return (
        <StoreConsumer>
          {(stores) => {
            return (
              <WrapperComponent {...stores} {...props} />
            );
          }}
        </StoreConsumer>
    );
  };
}