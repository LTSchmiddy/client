
interface NativeStorage {
    setItem: Function;
    getItem: Function;
    keys: Function;
    remove: Function;
    clear: Function;
}


interface Window {
    NativeStorage: NativeStorage;
    
}