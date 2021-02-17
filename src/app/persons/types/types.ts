export interface Item {
    id: number;
    name: string;
}
export interface Person extends Item {
    age?: number;
    imageUrl?: string;
}

export interface Viewmodel<T> {
    item?: T;
    items: T[];
    selectedItem?: T;
}
export type VmFn<T> = (vm: Viewmodel<T>) => Viewmodel<T>;

export type TypeProps<T> = { [key in keyof T]: T[key] };
export const propof = <T>(name: keyof T) => name;